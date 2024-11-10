class InertiaExampleController < ApplicationController
  skip_before_action :authenticate_user!
  def index
    render inertia: "LandingPage/Page"
  end
end
