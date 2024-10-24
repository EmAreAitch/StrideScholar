class UserProgress < ApplicationRecord
  belongs_to :topic
  belongs_to :room
  belongs_to :user
end
