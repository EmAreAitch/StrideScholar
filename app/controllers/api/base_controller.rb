class Api::BaseController < ActionController::Base
  protect_from_forgery with: :exception
  
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
end