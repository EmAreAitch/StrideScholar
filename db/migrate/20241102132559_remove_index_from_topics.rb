class RemoveIndexFromTopics < ActiveRecord::Migration[7.2]
  def change
    remove_index :topics, [:topicable_type, :topicable_id,:position], unique: true    
  end
end
