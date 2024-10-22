class Chat < ApplicationRecord
  belongs_to :chatable, polymorphic: true
  belongs_to :user
  belongs_to :room, optional: true

  validates :message, presence: true
end
