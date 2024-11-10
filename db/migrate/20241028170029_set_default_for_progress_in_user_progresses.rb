class SetDefaultForProgressInUserProgresses < ActiveRecord::Migration[7.2]
  def change
    change_column_default :user_progresses, :progress, 0
  end
end
