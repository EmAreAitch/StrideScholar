class AddUniqueIndexToUserProgress < ActiveRecord::Migration[7.2]
  def change
    add_index :user_progresses, 
              [:user_id, :room_id, :progressable_id, :progressable_type],
              unique: true              
  end
end
