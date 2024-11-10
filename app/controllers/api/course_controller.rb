class Api::CourseController < Api::BaseController
  before_action :verify_enrollment, only: [:update_progress]
  
  def subtopics        
    topic_progress = UserProgress.find_by(room_id: params[:room_id], user: current_user, progressable_type: "Topic", progressable_id: params[:topicable_id])
    topics = Topic.where(topicable_type: "Topic", topicable_id: params[:topicable_id]).order(:position)    
    if topic_progress
      topics.each do |topic|
        index = topic.position - 1
        topic.completed = (topic_progress.progress & (1 << index) != 0)
      end
    end
    
    render json: topics.as_json(only: [:id, :title, :duration, :topic_type, :topics_count], methods: [:completed])
  end

  def update_progress
    topic = Topic.includes(:topicable).find(params[:topic_id])
    
    begin      
      UserProgress.update_progress(
        progressable: topic,        
        room_id: params[:room_id],
        user: current_user,
        status: params[:status]
      )
    
      topics_completed = UserProgress.where(room_id: params[:room_id], user: current_user).sum {|i| i.progress.to_s(2).count('1')}

      render json: { status: :success, message: "Progress updated successfully", topics_completed: topics_completed}
    rescue => e      
      render json: { status: :error, message: "Failed to update progress" }
    end
  end

  private

  def verify_enrollment
    unless Enrollment.exists?(user_id: current_user.id, room_id: params[:room_id])
      render json: {
        status: :error,
        message: "You are not enrolled in this course"
      }, status: :forbidden 
    end
  end
end