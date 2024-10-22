require "test_helper"

class ChatControllerTest < ActionDispatch::IntegrationTest
  test "should get course" do
    get chat_course_url
    assert_response :success
  end

  test "should get topic" do
    get chat_topic_url
    assert_response :success
  end
end
