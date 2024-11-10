class CreateHashtags < ActiveRecord::Migration[7.2]
  def change
    create_table :hashtags do |t|
      t.string :name
      t.references :room, null: false, foreign_key: true

      t.timestamps
    end
    add_index :hashtags, [:room_id, :name]  # For efficient room-specific tag lookups
    add_index :hashtags, :name              # For searching across all tags

  end
end
