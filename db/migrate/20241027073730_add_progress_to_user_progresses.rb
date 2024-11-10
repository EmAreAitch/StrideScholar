class AddProgressToUserProgresses < ActiveRecord::Migration[7.2]
  def change
    add_column :user_progresses, :progress, :integer
  end
end
