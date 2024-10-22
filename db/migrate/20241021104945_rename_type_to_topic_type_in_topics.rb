class RenameTypeToTopicTypeInTopics < ActiveRecord::Migration[7.2]
  def change
    rename_column :topics, :type, :topic_type
  end
end
