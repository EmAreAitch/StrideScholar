# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # GET /resource/password/new
   def new
    self.resource = resource_class.new
    render inertia: "User/Password/New"
  end

  # POST /resource/password
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      redirect_to new_user_password_path
    else
      redirect_to new_user_password_path, inertia: {errors: resource.errors.to_hash(true)}
    end
  end
  # GET /resource/password/edit?reset_password_token=abcdef
  def edit
    super
    render inertia: "User/Password/Edit", props: {
      resetPasswordToken: resource.reset_password_token,
      minimumPasswordLength: @minimum_password_length
    } 
  end

  # PUT /resource/password
    def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      if resource_class.sign_in_after_reset_password
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        set_flash_message!(:notice, flash_message)
        resource.after_database_authentication
        sign_in(resource_name, resource)
      else
        set_flash_message!(:notice, :updated_not_active)
      end
      redirect_to root_path    
    else
      set_minimum_password_length
      redirect_to edit_user_password_path(reset_password_token: resource_params[:reset_password_token]), inertia: {errors: resource.errors.to_hash(true)}
    end
  end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end
