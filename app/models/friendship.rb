class Friendship < ApplicationRecord
	belongs_to :user
  belongs_to :friend, class_name: 'User'

  validates :user_id, uniqueness: { scope: :friend_id }
  validate :cannot_friend_self

  private

  def cannot_friend_self
    errors.add(:base, "Cannot friend yourself") if user_id == friend_id
  end
end
