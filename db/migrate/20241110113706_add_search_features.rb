class AddSearchFeatures < ActiveRecord::Migration[7.2]
  def change
    # Add pg_trgm for fuzzy search
    enable_extension 'pg_trgm'
    
    # Add indices for faster searching
    add_index :courses, :title
    add_index :courses, :description    
  end
end
