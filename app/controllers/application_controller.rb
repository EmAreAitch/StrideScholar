class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  before_action :authenticate_user!
  inertia_share flash: -> { flash.to_hash }
  inertia_share is_signed_in: -> { user_signed_in? }
  inertia_share authenticity_token: -> { form_authenticity_token }
end
