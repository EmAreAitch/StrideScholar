import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { dashboard } from '~/api';

const SocialPage = ({ enrolled_rooms, created_rooms, user }) => {
  const [showFriendModal, setShowFriendModal] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
  });

  const handleAddFriend = (e) => {
    e.preventDefault();
    post(route('friendships.store'), {
      onSuccess: () => {
        setShowFriendModal(false);
        reset();
      },
    });
  };

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const RoomCard = ({ room, type }) => {
    const selectedDays = DAYS.filter((_, index) => room.days & (1 << index));
    
    const formatTime = (timeString) => {
      return timeString.split('T')[1].slice(0, 5);
    };

    return (
      <div className="bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow">
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">{room.course.title}</h3>
            <p className="text-sm text-gray-500">
              {type === 'enrolled' ? 'Enrolled Room' : 'Created Room'}
            </p>
          </div>
          
          <p className="text-gray-600 mb-4">Participants: {room.participants}</p>
          
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{selectedDays.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatTime(room.start_time)} - {formatTime(room.end_time)}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>{room.locked ? 'Locked' : 'Open'}</span>
            </div>
          </div>
          
          <Link
            href={dashboard.showRoom.path({id: room.id})}
            className="mt-4 text-center block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Room
          </Link>
        </div>
      </div>
    );
  };

  const EmptyState = ({ message }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-500 text-center mb-4">{message}</p>
    </div>
  );

  const FriendModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add Friend</h3>
        <form onSubmit={handleAddFriend}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Friend's Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              placeholder="Enter friend's email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={() => setShowFriendModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              disabled={processing}
            >
              Add Friend
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <Head title="Social Page" />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.email}</h2>
                <p className="text-sm text-gray-500">Member since {new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <button
              onClick={() => setShowFriendModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Friend
            </button>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Enrolled Rooms Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Enrolled Rooms</h2>
            <div className="space-y-4">
              {enrolled_rooms.length > 0 ? (
                enrolled_rooms.map((room) => (
                  <RoomCard 
                    key={`enrolled-${room.id}`} 
                    room={room} 
                    type="enrolled" 
                  />
                ))
              ) : (
                <EmptyState 
                  message="User hasn't enrolled in any rooms yet."                                     
                />
              )}
            </div>
          </section>

          {/* Created Rooms Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Created Rooms</h2>
            <div className="space-y-4">
              {created_rooms.length > 0 ? (
                created_rooms.map((room) => (
                  <RoomCard 
                    key={`created-${room.id}`} 
                    room={room} 
                    type="created" 
                  />
                ))
              ) : (
                <EmptyState 
                  message="User hasn't created any rooms yet."                                    
                />
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Friend Modal */}
      {showFriendModal && <FriendModal />}
    </>
  );
};

export default SocialPage;