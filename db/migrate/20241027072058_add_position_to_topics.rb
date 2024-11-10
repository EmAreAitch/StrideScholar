class AddPositionToTopics < ActiveRecord::Migration[7.2]
  def change
    add_column :topics, :position, :integer, null: false, default: 0
  end
end
