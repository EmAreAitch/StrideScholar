class CreateTopics < ActiveRecord::Migration[7.2]
  def change
    create_table :topics do |t|
      t.string :title
      t.integer :type
      t.interval :duration
      t.references :topicable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
