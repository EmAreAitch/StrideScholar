class AddPlatformAndPlatformIdToCourse < ActiveRecord::Migration[7.2]
  def change
    add_column :courses, :platform, :integer
    add_column :courses, :platform_id, :integer
    add_index :courses, [:platform, :platform_id], unique: true
  end
end
