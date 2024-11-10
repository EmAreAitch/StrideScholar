class Topic < ApplicationRecord
  attr_accessor :completed  
  # default_scope { order(:position) }
  belongs_to :topicable, polymorphic: true, counter_cache: true
  positioned on: [:topicable_type,:topicable_id]
  belongs_to :course, counter_cache: :total_topics_count
  has_many :topics, as: :topicable
  has_many :user_progresses, as: :progressable
  has_one :chat, as: :chatable
  enum :topic_type, [:article, :video, :quiz, :project]
  validates :title, presence: true,
                   length: { minimum: 3, maximum: 255 }
  validates :topic_type, presence: true,
                        inclusion: { in: topic_types }
  validates :duration, presence: true
end
