class TopicChatChannel < ApplicationCable::Channel
  def subscribed
    @room_id = params[:room_id]
    @topic_id = params[:topic_id]
    stream_from "chat_room_#{@room_id}_topic_#{@course_id}"
  end

  def send_message(data)  
    chat = Chat.new(message: data['body'], room_id: @room_id, chatable_type: 'Topic', chatable_id: @topic_id, user: current_user)
    chat.save
    ActionCable.server.broadcast("chat_room_#{@room_id}_topic_#{@course_id}", chat.as_json(include: { user: { only: [:id, :email] } }),)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
