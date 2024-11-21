class Course < ApplicationRecord
	has_one :chat, as: :chatable
	has_many :user_progresses, as: :progressable, dependent: :destroy
	has_many :rooms, dependent: :destroy
	has_many :topics, -> { order(position: :asc) },  as: :topicable, inverse_of: :topicable, autosave: true
	has_many :all_topics, class_name: 'Topic', inverse_of: :course, dependent: :delete_all
	validates :title, presence: true, length: { minimum: 3, maximum: 255 }
	validates :description, presence: true
  validates :duration, presence: true 
  validates :platform, uniqueness: {
    scope: :platform_id,
    message: "Platform and Platform ID already exists"
  }  
	enum :platform, [:udemy, :coursera], suffix: true
	accepts_nested_attributes_for :topics, allow_destroy: true
end
