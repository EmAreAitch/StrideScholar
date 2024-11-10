class ChatController < ApplicationController
  def room
    room = Room.includes(:course).find(params[:id])
    if room.user == current_user || Enrollment.where(room: room, user: current_user).exists?
      render inertia: "Dashboard/RoomChat", props: {
        chatMessages: Chat.includes(:user).all.where(room: room, chatable: room.course).as_json(include: { user: { only: [:id, :email] } }),
        room: room.as_json(include: { course: { only: [:id, :title] } }),
        user_email: current_user.email,
        admin_email: room.user.email
      }
    else
      redirect_to rooms_path, alert: "Not authorized"
    end
  end

  def topic
    room = Room.includes(:course).find(params[:id])    
    if room.user == current_user || Enrollment.where(room: room, user: current_user).exists?
      render inertia: "Dashboard/TopicChat", props: {
        chatMessages: Chat.includes(:user).all.where(room: room, chatable_type: "Topic", chatable_id: params[:topic_id]).as_json(include: { user: { only: [:id, :email] } }),
        room: room.as_json(include: { course: { only: [:id, :title] } }),
        topic: Topic.find(params[:topic_id]),
        user_email: current_user.email,
        admin_email: room.user.email
      }
    else
      redirect_to room_path(room), alert: "You are not enrolled in this course"
    end
  end
end
