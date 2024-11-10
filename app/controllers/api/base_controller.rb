class Api::BaseController < ActionController::Base
  allow_browser versions: :modern  
  protect_from_forgery with: :exception
  before_action :verify_user_login
  before_action :verify_csrf_token     

  rescue_from ActionController::InvalidAuthenticityToken do |e|
    render json: { 
      error: 'Invalid CSRF Token', 
      status: :unprocessable_entity 
    }, status: :unprocessable_entity
  end

  private

  def verify_csrf_token
    if request.headers['X-XSRF-TOKEN'].nil?
      render json: { 
        error: 'Missing CSRF Token', 
        status: :forbidden 
      }, status: :forbidden     
    end
  end    
  def verify_user_login
    unless user_signed_in?
      render json: { 
        error: 'User not authenticated', 
        status: :forbidden 
      }, status: :forbidden     
    end
  end    
end