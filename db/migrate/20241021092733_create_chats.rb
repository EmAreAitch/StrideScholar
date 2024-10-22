class CreateChats < ActiveRecord::Migration[7.2]
  def change
    create_table :chats do |t|
      t.text :message
      t.references :chatable, polymorphic: true, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
