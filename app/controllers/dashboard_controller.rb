class DashboardController < ApplicationController
	def index
		render inertia: "Dashboard/Index", props: {
			createdRooms: Room.includes(:course).where(user: current_user).as_json(include: { course: { only: [:id, :title] } }),
      enrolledRooms: current_user.enrolled_rooms.includes(:course).as_json(include: { course: { only: [:id, :title] } })
		}
	end

  def show_room    
   room = Room.includes(
    :user,
    :enrollments,
    course: :topics
  ).find(params[:id])   

   user_progress = UserProgress.where(room: room, user: current_user)
   topics_completed = user_progress.sum {|i| i.progress.to_s(2).count('1')}
   course_progress = user_progress.find_by(progressable_type: 'Course')
   if course_progress
    room.course.topics.each do |topic|
      index = topic.position - 1
      topic.completed = (course_progress.progress & (1 << index) != 0)
    end
   end  

  # Preload current user's enrollment status
  current_user_enrolled = room.enrollments.loaded? ? 
    room.enrollments.any? { |e| e.user_id == current_user.id } :
    room.enrollments.exists?(user: current_user)

  # Calculate enrollments count using the preloaded association
  enrollments_count = room.enrollments.loaded? ? 
    room.enrollments.size : 
    room.enrollments.count  

  render inertia: 'Dashboard/ShowRoom', props: {
    room: room.as_json(
      include: {
        course: {
          only: [:title, :description, :duration, :topics_count, :total_topics_count],
          include: {
            topics: {
              only: [:id, :title, :duration, :topic_type, :topics_count, :completed],
              methods: [:completed]
            }
          }
        },
        user: {
          only: [:email]
        }
      }
    ).merge(enrollments_count: enrollments_count),
    can_enroll: !room.locked? && 
                enrollments_count < room.participants && 
                !current_user_enrolled && room.user != current_user,
    auth_user: current_user.as_json(only: [:id, :email]),
    topics_completed: topics_completed
  }  
end

def explore  
  rooms = Room.search(query: params[:query]).includes(:course)
              .where.not(id: current_user.rooms.select(:id)) # Exclude owned rooms
              .where.not(id: current_user.enrolled_rooms.select(:id)) # Exclude enrolled rooms
  puts "rooms: #{rooms}"
  render inertia: "Dashboard/Explore", props: {
    rooms: rooms.as_json(include: { course: { only: [:id, :title] } })
  }
end
	
	def new_room
    courses = Course.all
    render inertia: 'Dashboard/NewRoom', props: {
      courses: courses.map { |course| { id: course.id, title: course.title } }
    }
  end

  def create_room
    params_hash = room_params.to_h
    link = params_hash.delete(:course_url)
    scr = UdemyScraper.new
    course = scr.extract_course_details(link)    
    @room = Room.new(params_hash.merge({user: current_user, course: course}))    
    if @room.save
      redirect_to rooms_path, notice: 'Room was successfully created.'      
    else      
      redirect_to new_room_path, inertia: {errors: @room.errors.to_hash(true).merge(course.errors.to_hash(true))}
    end
  end

  private

  def room_params
    params.require(:room).permit(:course_url, :participants, :days, :start_date, :start_time, :end_time, :locked)
  end
end
