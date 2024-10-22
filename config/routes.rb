Rails.application.routes.draw do  
  get "chat/course"
  get "chat/topic"
  defaults export: true do
    # All routes defined inside this block will be exported.
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

    post 'enrollments', to: 'enrollments#create', as: :enrollments_create
  end
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
end
