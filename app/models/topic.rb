class Topic < ApplicationRecord
  belongs_to :topicable, polymorphic: true  
  has_many :topics, as: :topicable
  has_one :chat, as: :chatable
  enum topic_type: { article: 0, video: 1, quiz: 2, project: 3 }
  validates :title, presence: true,
                   length: { minimum: 3, maximum: 255 }
  validates :topic_type, presence: true,
                        inclusion: { in: topic_types.keys }
  validates :duration, presence: true
end
