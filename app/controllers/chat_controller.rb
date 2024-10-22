class ChatController < ApplicationController
  def room
    room = Room.includes(:course).find(params[:id])
    if room.user == current_user || Enrollment.where(room: room, user: current_user).exists?
      render inertia: "Dashboard/RoomChat", props: {
        chatMessages: Chat.includes(:user).all.where(room: room, chatable: room.course).as_json(include: { user: { only: [:id, :email] } }),
        room: room.as_json(include: { course: { only: [:id, :title] } }),
      }
    else
      redirect_to rooms_path, alert: "Not authorized"
    end
  end

  def topic
  end
end
