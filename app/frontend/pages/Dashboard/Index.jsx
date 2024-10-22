import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { dashboard } from '~/api'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const RoomCard = ({ room, isCreator }) => {
  const selectedDays = DAYS.filter((_, index) => room.days & (1 << index));
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (timeString) => {
    return timeString.split('T')[1].slice(0,5)
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{room.course.title}</h3>
      <p className="text-gray-600 mb-2">Participants: {room.participants}</p>
      <p className="text-gray-600 mb-2">
        Days: {selectedDays.join(', ')}
      </p>
      <p className="text-gray-600 mb-2">
        Start Date: {formatDate(room.start_date)}
      </p>
      <p className="text-gray-600 mb-2">
        Time: {formatTime(room.start_time)} - {formatTime(room.end_time)}
      </p>
      <p className="text-gray-600 mb-2">
        Status: {room.locked ? 'Locked' : 'Open'}
      </p>      
      <Link
        href={dashboard.showRoom.path({id: room.id})}
        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        View Room
      </Link>
    </div>
  );
};

const RoomsList = ({ title, rooms, isCreator }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {rooms.length === 0 ? (
      <p className="text-gray-600">No rooms to display.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} isCreator={isCreator} />
        ))}
      </div>
    )}
  </div>
);

const RoomsIndex = ({createdRooms, enrolledRooms}) => {    
  const [activeTab, setActiveTab] = useState('created');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Rooms</h1>
      
      <div className="mb-6">
        <button
          className={`mr-4 py-2 px-4 rounded ${
            activeTab === 'created' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('created')}
        >
          Created Rooms
        </button>
        <button
          className={`py-2 px-4 rounded ${
            activeTab === 'enrolled' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('enrolled')}
        >
          Enrolled Rooms
        </button>
      </div>

{activeTab === 'created' && (
  <>
    <RoomsList title="Rooms You've Created" rooms={createdRooms} isCreator={true} />
    {createdRooms.length === 0 && (
      <Link
        href={dashboard.newRoom.path()}
        className="mt-8 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Create New Room
      </Link>
    )}
  </>
)}

{activeTab === 'enrolled' && (
  <>
    <RoomsList title="Rooms You're Enrolled In" rooms={enrolledRooms} isCreator={false} />
    {enrolledRooms.length === 0 && (
      <Link
        href={dashboard.explore.path()}
        className="mt-8 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Explore rooms
      </Link>
    )}
  </>
)}

      
    </div>
  );
};

export default RoomsIndex;