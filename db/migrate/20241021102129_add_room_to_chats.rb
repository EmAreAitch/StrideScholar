class AddRoomToChats < ActiveRecord::Migration[7.2]
  def change
    add_reference :chats, :room, foreign_key: true
  end
end
