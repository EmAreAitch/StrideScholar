class Api::CourseController < Api::BaseController
  before_action :verify_enrollment, only: [:update_progress]
  
  def subtopics    
    render json: Topic.where(topicable_type: "Topic", topicable_id: params[:topicable_id])
  end

  def update_progress
    progress = UserProgress.find_or_initialize_by(
      user: current_user,
      room_id: params[:room_id],
      topic_id: params[:topic_id]
    )
    
    progress.completed = params[:status]
    
    if progress.save
      render json: {
        status: :success,
        message: "Progress updated successfully",
        data: {
          topic_id: progress.topic_id,
          completed: progress.completed,
          updated_at: progress.updated_at
        }
      }, status: :ok
    else
      render json: {
        status: :error,
        message: "Failed to update progress",
        errors: progress.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def verify_enrollment
    unless Enrollment.exists?(user_id: current_user.id, room_id: params[:room_id])
      render json: {
        status: :error,
        message: "You are not enrolled in this course"
      }, status: :forbidden 
    end
  end

  def progress_params
    params.require(:progress).permit(:topic_id, :room_id, :status)
  end
end