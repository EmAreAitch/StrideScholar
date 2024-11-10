# seeds.rb
require 'faker'

# Constants for controlling the amount of data
NUM_USERS = 25
NUM_COURSES = 10
TOPICS_PER_COURSE = 5
ROOMS_PER_COURSE = 2
MAX_ENROLLMENTS_PER_ROOM = 15
CHATS_PER_ROOM = 20

# Helper method to generate random time interval
def random_interval
  rand(1..12).hours
end

# Helper method to generate random future date
def random_future_date
  Date.today + rand(1..30).days
end

# Helper method to generate random time
def random_time
  hour = rand(8..20) # Between 8 AM and 8 PM
  minute = [0, 15, 30, 45].sample
  Time.current.change(hour: hour, min: minute)
end

# New method to generate end time
def generate_end_time(start_time)
  duration = rand(1..3).hours
  end_time = (start_time + duration).change(
    year: start_time.year,
    month: start_time.month,
    day: start_time.day
  )  
  end_time
end

# Helper method to generate random days combination
def random_days
  Room::DAYS.values.sample(rand(1..3)).sum
end

# Clear existing data
puts "Clearing existing data..."
ActiveRecord::Base.connection.disable_referential_integrity do
  # Either use this single command with CASCADE:
  ActiveRecord::Base.connection.execute(
    "TRUNCATE chats, enrollments, topics, rooms, courses, users, user_progresses RESTART IDENTITY CASCADE;"
  )
  
  # OR use this approach with correct order if you prefer separate commands:
  # tables = %w[chats enrollments topics rooms courses users]
  # tables.each do |table|
  #   ActiveRecord::Base.connection.execute("TRUNCATE #{table} RESTART IDENTITY;")
  # end
end
# Chat.destroy_all
# Enrollment.destroy_all
# Topic.destroy_all
# Room.destroy_all
# Course.destroy_all
# User.destroy_all

# Create users
puts "Creating #{NUM_USERS} users..."
users = NUM_USERS.times.map do |i|
  User.create!(
    email: Faker::Internet.unique.email,
    password: 'password123',
    password_confirmation: 'password123'
  )
end

# Create courses with topics
puts "Creating #{NUM_COURSES} courses..."
courses = NUM_COURSES.times.map do |i|
  course = Course.create!(
    title: Faker::Educator.unique.course_name,
    description: Faker::Lorem.paragraph(sentence_count: 3),
    duration: random_interval
  )

  # Create topics for the course
  TOPICS_PER_COURSE.times do
    topic = Topic.create!(
      title: Faker::Educator.subject,
      topic_type: Topic.topic_types.keys.sample,
      duration: random_interval,
      topicable: course,
      course: course
    )

    rand(1..3).times do 
      Topic.create!(
      title: Faker::Educator.subject,
      topic_type: Topic.topic_types.keys.sample,
      duration: random_interval,
      topicable: topic,
      course: course
    )
    end 
    
  end

  course
end

# Create rooms for each course
puts "Creating rooms and enrollments..."
courses.each do |course|
  ROOMS_PER_COURSE.times do
    start_time = random_time
    end_time = generate_end_time(start_time)
    
    room = Room.create!(
      participants: rand(1..5) * 5,
      user: users.sample, # instructor
      days: random_days,
      start_date: random_future_date,
      start_time: start_time,
      end_time: end_time,
      locked: [true, false].sample,
      course: course
    )

    # Create enrollments for the room
    num_enrollments = rand(3..(room.participants * 3 / 5))
    enrolled_users = users.sample(num_enrollments)
    enrolled_users.each do |user|
      Enrollment.create!(
        user: user,
        room: room
      )
    end

    # Create chats for the room
    CHATS_PER_ROOM.times do
      Chat.create!(
        message: Faker::Lorem.paragraph,
        user: enrolled_users.sample,
        room: room,
        chatable: [room, course, course.topics.sample].sample,
        created_at: Time.now - rand(1..30).days
      )
    end
  end
end

Topic.heal_position_column!(:created_at)

# Print summary
puts "\nSeeding completed!"
puts "Created:"
puts "- #{User.count} users"
puts "- #{Course.count} courses"
puts "- #{Topic.count} topics"
puts "- #{Room.count} rooms"
puts "- #{Enrollment.count} enrollments"
puts "- #{Chat.count} chats"