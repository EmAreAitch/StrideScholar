class AddCourceToRooms < ActiveRecord::Migration[7.2]
  def change
    add_reference :rooms, :course, null: false, foreign_key: true
  end
end
