class AddTotalTopicsCountToCourses < ActiveRecord::Migration[7.2]
  def change
    add_column :courses, :total_topics_count, :integer, default: 0
  end
end
