import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { users, apiFriendships } from '~/api';
import axios from 'axios';
import { Notyf } from 'notyf';

const FriendsIndex = ({ friends, all_users, user, friendRequests = { incoming: [], outgoing: [] } }) => {
  const { authenticity_token } = usePage().props;
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('friends');

  const handleAddFriend = async (id) => {
    try {
      const response = await axios.post(apiFriendships.create.path(), {
        authenticity_token,
        friend_id: id
      });
      
      new Notyf().success(response.data.message);
    } catch (error) {
      new Notyf().error(error.response.data.message);
    }
  };

  const handleFriendRequest = async (requestId, action) => {
    try {
      const response = await axios.post(apiFriendships[action].path(requestId), {
        authenticity_token
      });
      
      new Notyf().success(response.data.message);
    } catch (error) {
      new Notyf().error(error.response.data.message);
    }
  };

  // Filter users based on search term and active tab
  const getFilteredContent = () => {
    if (activeTab === 'requests') {
      const filteredRequests = {
        incoming: friendRequests.incoming.filter(request =>
          request.sender.email.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        outgoing: friendRequests.outgoing.filter(request =>
          request.recipient.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      };
      return filteredRequests;
    }

    return (activeTab === 'friends' ? friends : all_users)
      .filter(u => 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const UserCard = ({ displayUser, isFriend }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <Link href={users.show.path({id: displayUser.id})}>
              <h3 className="text-lg font-semibold">{displayUser.email.split("@")[0]}</h3>
            </Link>
            <p className="text-sm text-gray-500">{displayUser.email}</p>
            <p className="text-xs text-gray-400">
              Joined {new Date(displayUser.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        {!isFriend && displayUser.id !== user.id && (
          <button
            onClick={() => handleAddFriend(displayUser.id)}
            className="inline-flex whitespace-nowrap items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Friend</span>
          </button>
        )}
      </div>
    </div>
  );

  const RequestCard = ({ request, type }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <Link href={users.show.path({id: type === 'incoming' ? request.sender.id : request.recipient.id})}>
              <h3 className="text-lg font-semibold">
                {type === 'incoming' 
                  ? request.sender.email.split("@")[0]
                  : request.recipient.email.split("@")[0]
                }
              </h3>
            </Link>
            <p className="text-sm text-gray-500">
              {type === 'incoming' ? request.sender.email : request.recipient.email}
            </p>
            <p className="text-xs text-gray-400">
              Sent {new Date(request.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {type === 'incoming' ? (
            <>
              <button
                onClick={() => handleFriendRequest(request.id, 'accept')}
                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Accept
              </button>
              <button
                onClick={() => handleFriendRequest(request.id, 'decline')}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Decline
              </button>
            </>
          ) : (
            <button
              onClick={() => handleFriendRequest(request.id, 'cancel')}
              className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel Request
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const filteredContent = getFilteredContent();

  return (
    <>
      <Head title="Friends and Users" />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Friends and Users</h1>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'friends'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Friends ({friends.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'requests'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Requests ({friendRequests.incoming.length + friendRequests.outgoing.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              All Users ({all_users.length})
            </button>
          </div>
        </div>

        {/* Content Grid */}
        {activeTab === 'requests' ? (
          <div className="space-y-6">
            {/* Incoming Requests */}
            {filteredContent.incoming.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Incoming Requests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredContent.incoming.map((request) => (
                    <RequestCard key={request.id} request={request} type="incoming" />
                  ))}
                </div>
              </div>
            )}

            {/* Outgoing Requests */}
            {filteredContent.outgoing.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Outgoing Requests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredContent.outgoing.map((request) => (
                    <RequestCard key={request.id} request={request} type="outgoing" />
                  ))}
                </div>
              </div>
            )}

            {/* No Requests Message */}
            {filteredContent.incoming.length === 0 && filteredContent.outgoing.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 text-lg">
                  No friend requests found.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredContent.length > 0 ? (
              filteredContent.map((displayUser) => (
                <UserCard
                  key={displayUser.id}
                  displayUser={displayUser}
                  isFriend={friends.some(friend => friend.id === displayUser.id)}
                />
              ))
            ) : (
              <div className="col-span-2">
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-500 text-lg">
                    No users found matching your search criteria.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default FriendsIndex;