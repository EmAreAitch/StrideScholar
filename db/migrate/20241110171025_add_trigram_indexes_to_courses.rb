class AddTrigramIndexesToCourses < ActiveRecord::Migration[7.2]
  def change
    remove_index :courses, :title
    remove_index :courses, :description
    add_index :courses, :title, using: :gin, opclass: :gin_trgm_ops
    add_index :courses, :description, using: :gin, opclass: :gin_trgm_ops
  end
end
