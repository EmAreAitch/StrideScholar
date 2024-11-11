Rails.application.routes.draw do  
  defaults export: true do
    # Existing routes
    root 'inertia_example#index'
    devise_for :users, controllers: {
        sessions: 'users/sessions',
        registrations: 'users/registrations',
        passwords: "users/passwords"
    }
    get 'dashboard', to: 'dashboard#index', as: :rooms
    get 'dashboard/new_room', to: 'dashboard#new_room', as: :new_room
    get 'dashboard/explore', to: 'dashboard#explore', as: :explore
    get 'dashboard/room/:id', to: 'dashboard#show_room', as: :room
    post 'dashboard/create_room', to: 'dashboard#create_room', as: :show_room
    get 'dashboard/room/:id/chat', to: 'chat#room', as: :room_chat
    get 'dashboard/room/:id/topic/:topic_id/chat', to: 'chat#topic', as: :topic_chat
    post 'enrollments', to: 'enrollments#create', as: :enrollments_create

    # New resources routes
    get 'dashboard/room/:room_id/topic/:topic_id/resources', to: 'resources#index', as: :topic_resources
    post 'dashboard/room/:room_id/topic/:topic_id/resources', to: 'resources#create', as: :create_topic_resource
    delete 'dashboard/room/:room_id/topic/:topic_id/resources/:id', to: 'resources#destroy', as: :delete_topic_resource

    namespace :api do
      get 'subtopics', to: "course#subtopics", as: :subtopics
      patch 'update-progress', to: "course#update_progress", as: :update_progress
    end
  end
  
  # Health check and PWA routes
  get "up" => "rails/health#show", as: :rails_health_check
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
end