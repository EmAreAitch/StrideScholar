class UserProgress < ApplicationRecord
  belongs_to :user
  belongs_to :room
  belongs_to :progressable, polymorphic: true

  def self.update_progress(progressable:, room_id:, user:, status:)    
    ActiveRecord::Base.transaction do
      begin
      topicable = progressable.topicable      
      topicable_progress = UserProgress.find_or_initialize_by(
        progressable: topicable, 
        room_id: room_id, 
        user: user
      )      
      topicable_progress.update_progress_by_position(progressable.position, status)            
      if topicable_progress.progress_changed?
        all_records = update_subtopics(progressable, room_id, user, status).to_a.concat(
          update_topicables(topicable, topicable_progress, room_id, user, status)
        )
        
        # Bulk upsert all records
        UserProgress.upsert_all(
          all_records.map { |record| 
            record.attributes.slice(
              'user_id', 
              'room_id', 
              'progressable_id', 
              'progressable_type', 
              'progress'
            )
          },
          unique_by: [:user_id, :room_id, :progressable_id, :progressable_type]
        )
      end
    rescue StandardError => e
      # Log the specific error
      Rails.logger.error "Transaction failed: #{e.message}"
      Rails.logger.error e.backtrace.join("\n")
      raise # Re-raise the exception to trigger rollback
    end
    end
  end

  

  def update_progress_by_position(position, status)    
    index = position - 1
    self.progress = if status
      self.progress | (1 << index)
    else
      self.progress & ~(1 << index)
    end  
  end

  def mark(status)
    self.progress = if status
      (2 ** progressable.topics_count) - 1
    else
      0
    end
  end

  def completed_count
    progress.to_s(2).count('1')
  end

  private

  def self.update_subtopics(progressable, room_id, user, status)
    return [] unless progressable.topics_count > 0
    
    progressable_progress = UserProgress.find_or_initialize_by(
      progressable: progressable, 
      room_id: room_id, 
      user: user
    )
    progressable_progress.mark(status)
    result = [progressable_progress]
    
    subtopics = progressable.topics.where('topics_count > 0')
    queue = subtopics.to_a
    
    until queue.empty?
      t = queue.shift
      subtopics_progress = UserProgress.find_or_initialize_by(
        progressable: t, 
        room_id: room_id, 
        user: user
      )
      subtopics_progress.mark(status)
      result << subtopics_progress
      
      subtopics = t.topics.where('topics_count > 0')
      queue.concat(subtopics)
    end
    result
  end

  def self.update_topicables(topicable, topicable_progress, room_id, user, status)
    result = [topicable_progress]
    return result unless topicable.is_a? Topic
    while (topicable.topics_count == topicable_progress.completed_count || 
          (topicable.topics_count - 1 == topicable_progress.completed_count && !status))
      

      position = topicable.position
      topicable = topicable.topicable
      
      topicable_progress = UserProgress.find_or_initialize_by(
        progressable: topicable, 
        room_id: room_id, 
        user: user
      )
      topicable_progress.update_progress_by_position(position, status)
      result << topicable_progress            
      break unless topicable.is_a?(Topic) and topicable_progress.progress_changed?
    end
    result
  end
end