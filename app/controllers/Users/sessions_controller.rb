# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [ :create ]

 def new
    super do 
      render inertia: "User/Session/New" and return
    end
  end

  def destroy
    super do | resource |
      redirect_to new_user_session_path and return
    end
  end

  protected

  def after_sign_in_path_for(resource)
    # Path after sign-in
    rooms_path
  end
  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [ :attribute ])
  end
end
