class UsersController < ApplicationController
    def show
        user = User.find(params[:id])
        render inertia: "Dashboard/Social", props: {            
			created_rooms: Room.includes(:course).where(user: user).as_json(include: { course: { only: [:id, :title] } }),
            enrolled_rooms: user.enrolled_rooms.includes(:course).as_json(include: { course: { only: [:id, :title] } }),
            user: user
		}
    end

    def index
        render inertia: "Dashboard/Users", props: {            
			friends: current_user.friends,
            all_users: User.all,
            user: current_user
		}
    end
end
