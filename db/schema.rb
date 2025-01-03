# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_11_21_183643) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_trgm"
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "chats", force: :cascade do |t|
    t.text "message"
    t.string "chatable_type", null: false
    t.bigint "chatable_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "room_id"
    t.index ["chatable_type", "chatable_id"], name: "index_chats_on_chatable"
    t.index ["room_id"], name: "index_chats_on_room_id"
    t.index ["user_id"], name: "index_chats_on_user_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.interval "duration"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "topics_count", default: 0, null: false
    t.integer "total_topics_count", default: 0
    t.integer "platform"
    t.integer "platform_id"
    t.index ["description"], name: "index_courses_on_description", opclass: :gin_trgm_ops, using: :gin
    t.index ["platform", "platform_id"], name: "index_courses_on_platform_and_platform_id", unique: true
    t.index ["title"], name: "index_courses_on_title", opclass: :gin_trgm_ops, using: :gin
  end

  create_table "enrollments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "room_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_enrollments_on_room_id"
    t.index ["user_id"], name: "index_enrollments_on_user_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "friend_id", null: false
    t.string "status", default: "pending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "friend_id"], name: "index_friendships_on_user_id_and_friend_id", unique: true
  end

  create_table "hashtags", force: :cascade do |t|
    t.string "name"
    t.bigint "room_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_hashtags_on_name"
    t.index ["room_id", "name"], name: "index_hashtags_on_room_id_and_name"
    t.index ["room_id"], name: "index_hashtags_on_room_id"
  end

  create_table "resources", force: :cascade do |t|
    t.string "title"
    t.integer "resource_type"
    t.string "url"
    t.bigint "topic_id", null: false
    t.bigint "user_id", null: false
    t.bigint "room_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_resources_on_room_id"
    t.index ["topic_id"], name: "index_resources_on_topic_id"
    t.index ["user_id"], name: "index_resources_on_user_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.integer "participants"
    t.bigint "user_id", null: false
    t.integer "days"
    t.date "start_date"
    t.time "start_time"
    t.time "end_time"
    t.boolean "locked"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "course_id", null: false
    t.index ["course_id"], name: "index_rooms_on_course_id"
    t.index ["user_id"], name: "index_rooms_on_user_id"
  end

  create_table "topics", force: :cascade do |t|
    t.string "title"
    t.integer "topic_type"
    t.interval "duration"
    t.string "topicable_type", null: false
    t.bigint "topicable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position", default: 0, null: false
    t.integer "topics_count", default: 0, null: false
    t.bigint "course_id", null: false
    t.index ["course_id"], name: "index_topics_on_course_id"
    t.index ["topicable_type", "topicable_id"], name: "index_topics_on_topicable"
  end

  create_table "user_progresses", force: :cascade do |t|
    t.bigint "room_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "progress", default: 0
    t.string "progressable_type", null: false
    t.bigint "progressable_id", null: false
    t.index ["progressable_type", "progressable_id"], name: "index_user_progresses_on_progressable"
    t.index ["room_id"], name: "index_user_progresses_on_room_id"
    t.index ["user_id", "room_id", "progressable_id", "progressable_type"], name: "idx_on_user_id_room_id_progressable_id_progressable_fafddc20a8", unique: true
    t.index ["user_id"], name: "index_user_progresses_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "chats", "rooms"
  add_foreign_key "chats", "users"
  add_foreign_key "enrollments", "rooms"
  add_foreign_key "enrollments", "users"
  add_foreign_key "friendships", "users"
  add_foreign_key "friendships", "users", column: "friend_id"
  add_foreign_key "hashtags", "rooms"
  add_foreign_key "resources", "rooms"
  add_foreign_key "resources", "topics"
  add_foreign_key "resources", "users"
  add_foreign_key "rooms", "courses"
  add_foreign_key "rooms", "users"
  add_foreign_key "topics", "courses"
  add_foreign_key "user_progresses", "rooms"
  add_foreign_key "user_progresses", "users"
end
