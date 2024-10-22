class Course < ApplicationRecord
	has_one :chat, as: :chatable
	has_many :rooms
	has_many :topics, as: :topicable
	validates :title, presence: true, length: { minimum: 3, maximum: 255 }
	validates :description, presence: true
  validates :duration, presence: true
end
