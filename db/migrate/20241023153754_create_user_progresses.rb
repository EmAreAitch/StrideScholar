class CreateUserProgresses < ActiveRecord::Migration[7.2]
  def change
    create_table :user_progresses do |t|
      t.references :topic, null: false, foreign_key: true
      t.references :room, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.boolean :completed
      
      t.timestamps
    end

    add_index :user_progresses, [:topic_id, :room_id, :user_id], unique: true
  end
end
