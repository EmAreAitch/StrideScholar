class Room < ApplicationRecord
  belongs_to :user
  belongs_to :course
  has_many :chats
  has_many :enrollments
  has_many :users, through: :enrollments
  validates :participants, presence: true, numericality: { greater_than: 0 }
  validates :days, presence: true, numericality: { greater_than: 0, message: "can't be empty"  }
  validates :start_date, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validate :end_time_after_start_time
  validate :start_date_cannot_be_in_past  

  DAYS = {
    monday: 1,
    tuesday: 2,
    wednesday: 4,
    thursday: 8,
    friday: 16,
    saturday: 32,
    sunday: 64
  }.freeze

  validates :days, presence: true  

  def wdays
    DAYS.select { |_k, v| days & v > 0 }.keys
  end

  def has_day?(day)
    days & DAYS[day.to_sym] > 0
  end

  def enrollments_count
    enrollments.count
  end

  # Scope to find records with specific days
  scope :with_day, ->(day) { 
    where('days & ? > 0', DAYS[day.to_sym])
  }

  scope :with_all_days, ->(days) {
    mask = Array(days).sum { |day| DAYS[day.to_sym] }
    where('(days & ?) = ?', mask, mask)
  }

  private
  
  def end_time_after_start_time
    return unless start_time && end_time
    
    if end_time <= start_time
      errors.add(:end_time, "must be after start time")
    end
  end
  
  def start_date_cannot_be_in_past
    return unless start_date
    
    if start_date < Date.current
      errors.add(:start_date, "cannot be in the past")
    end
  end
end