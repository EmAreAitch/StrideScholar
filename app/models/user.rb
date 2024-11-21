class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :enrollments
  has_many :enrolled_rooms, through: :enrollments, source: :room
  has_many :rooms
  has_many :user_progresses
  has_many :friendships
  has_many :passive_friendships, class_name: 'Friendship', foreign_key: 'friend_id'

  def friends
    active_friends = friendships.where(status: 'accepted').map(&:friend)
    passive_friends = passive_friendships.where(status: 'accepted').map(&:user)
    active_friends + passive_friends
  end

  def friend_requests
    passive_friendships.where(status: 'pending')
  end

  def pending_requests
    friendships.where(status: 'pending')
  end

  def add_friend(other_user)
    friendships.create(friend: other_user, status: 'pending')
  end

  def accept_friend(other_user)
    friendship = passive_friendships.find_by(user: other_user, status: 'pending')
    friendship.update(status: 'accepted') if friendship
  end
end
