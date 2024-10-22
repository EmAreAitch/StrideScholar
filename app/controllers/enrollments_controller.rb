class EnrollmentsController < ApplicationController
	 def create
    room = Room.find(params[:room_id])
    
    if !room.locked? && room.enrollments.count < room.participants && !room.user != current_user
      enrollment = current_user.enrollments.build(room: room)
      
      if enrollment.save
        redirect_to room_path(room), notice: 'Successfully enrolled in the room'
      else
        redirect_to room_path(room), alert: 'Unable to enroll in the room'
      end
    else
      redirect_to room_path(room), alert: 'Room is either locked or full'
    end
  end
end
