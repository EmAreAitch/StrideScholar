class AddProgressableToUserProgresses < ActiveRecord::Migration[7.2]
  def change
    add_reference :user_progresses, :progressable, polymorphic: true, null: false
    remove_reference :user_progresses, :topic, foreign_key: true, index: true
  end
end
