class AddTopicsCountsToCoursesAndTopics < ActiveRecord::Migration[7.2]
  def change
    add_column :courses, :topics_count, :integer, null: false, default: 0
    add_column :topics, :topics_count, :integer, null: false, default: 0
  end
end
