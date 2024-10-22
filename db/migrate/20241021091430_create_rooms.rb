class CreateRooms < ActiveRecord::Migration[7.2]
  def change
    create_table :rooms do |t|
      t.integer :participants
      t.references :user, null: false, foreign_key: true
      t.integer :days
      t.date :start_date
      t.time :start_time
      t.time :end_time
      t.boolean :locked

      t.timestamps
    end
  end
end
