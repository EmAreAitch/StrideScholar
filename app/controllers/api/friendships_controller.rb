class Api::FriendshipsController < Api::BaseController
	def create
    friend = User.find(params[:friend_id])
    current_user.add_friend(friend)
    render json: {
    	status: 'success',
    	message: 'Friend request sent!'
    }
  end

  def accept
    friend = User.find(params[:friend_id])
    current_user.accept_friend(friend)
    render json: {
    	status: 'success',
    	message: 'Friend request accepted!'
    }
  end
end
