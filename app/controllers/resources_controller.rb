# app/controllers/resources_controller.rb
class ResourcesController < ApplicationController
  # include DirectUploadsController
  
  before_action :authenticate_user!
  before_action :set_topic
  before_action :set_room
  before_action :set_resource, only: [:destroy]

  def index
    resources = Resource.includes(:user).where(topic: @topic, room: @room, user: current_user).map do |resource|
      {
        id: resource.id,
        title: resource.title,
        resource_type: resource.resource_type,
        url: resource.url,
        file_url: resource.file.attached? ? url_for(resource.file) : nil,
        created_at: resource.created_at,
        user: {
          id: resource.user.id,
          email: resource.user.email
        }
      }
    end

    render inertia: 'Dashboard/TopicResources', props: {
      topic: @topic.as_json(only: [:id, :title]),
      room: @room.as_json(only: [:id]),
      resources: resources
    }
  end

  def create
    @resource = @topic.resources.build(resource_params)
    @resource.user = current_user
    @resource.room = @room

    if @resource.save
      redirect_to topic_resources_path(@room, @topic)
    else
      redirect_to topic_resources_path(@room, @topic), inertia: {errors: @resource.errors.to_hash(true)}
    end
  end

  def destroy
    @resource.destroy
    redirect_to topic_resources_path(@topic), notice: 'Resource was successfully removed.'
  end

  private

  def set_topic
    @topic = Topic.find(params[:topic_id])
  end

  def set_room
    @room = Room.find(params[:room_id])
  end

  def set_resource
    @resource = @topic.resources.find(params[:id])
  end

  def resource_params
    params.require(:resource).permit(:title, :resource_type, :url, :file)
  end
end