class Course < ApplicationRecord
	has_one :chat, as: :chatable
	has_many :user_progresses, as: :progressable
	has_many :rooms
	has_many :topics, -> { order(position: :asc) },  as: :topicable
	has_many :all_topics, class_name: 'Topic'
	validates :title, presence: true, length: { minimum: 3, maximum: 255 }
	validates :description, presence: true
  validates :duration, presence: true 

  # def reset_total_topics_count
  # 	update!(total_topics_count: all_topics.count)
  # end 
end
