class AddIndexToTopics < ActiveRecord::Migration[7.2]
  def change
    add_index :topics, [:topicable_type, :topicable_id,:position], unique: true
  end
end
