class AddCourseToTopics < ActiveRecord::Migration[7.2]
  def change
    add_reference :topics, :course, null: false, foreign_key: true
  end
end
