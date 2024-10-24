class Topic < ApplicationRecord
  belongs_to :topicable, polymorphic: true  
  has_many :topics, as: :topicable
  has_one :chat, as: :chatable
  enum :topic_type, [:article, :video, :quiz, :project]
  validates :title, presence: true,
                   length: { minimum: 3, maximum: 255 }
  validates :topic_type, presence: true,
                        inclusion: { in: topic_types }
  validates :duration, presence: true
end
