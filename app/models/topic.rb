class Topic < ApplicationRecord
  attr_accessor :completed  
  # default_scope { order(:position) }
  belongs_to :topicable, polymorphic: true, counter_cache: true, inverse_of: :topics
  positioned on: [:topicable_type,:topicable_id]
  belongs_to :course, counter_cache: :total_topics_count, inverse_of: :all_topics
  has_many :topics, as: :topicable, inverse_of: :topicable, autosave: true, dependent: :delete_all
  has_many :user_progresses, as: :progressable
  has_many :resources, dependent: :destroy
  has_one :chat, as: :chatable
  enum :topic_type, [:article, :video, :quiz, :project, :chapter, :other]
  validates :title, presence: true,
                   length: { minimum: 3, maximum: 255 }
  validates :topic_type, presence: true,
                        inclusion: { in: topic_types }
  validates :duration, presence: true
  accepts_nested_attributes_for :topics, allow_destroy: true
end
