class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :room
  validates :user_id, uniqueness: { scope: :room_id, message: "User is already enrolled in this room" }
end
