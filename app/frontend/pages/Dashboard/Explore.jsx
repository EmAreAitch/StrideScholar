import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { dashboard } from '~/api';

const SearchForm = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.get(
      dashboard.explore.path(),
      { query },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleClear = () => {
    setQuery('');
    router.get(
      window.location.pathname,
      { query: '' },
      { preserveState: true, preserveScroll: true }
    );
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rooms..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
    </div>
  );
};

const RoomCard = ({ room }) => {
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const selectedDays = DAYS.filter((_, index) => room.days & (1 << index));
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const formatTime = (timeString) => {
    return timeString.split('T')[1].slice(0,5);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{room.course.title}</h3>
      <p className="text-gray-600 font-semibold mb-2">Participants: {room.participants}</p>
      <p className="text-gray-600 font-semibold mb-2">
        Days: {selectedDays.join(', ')}
      </p>
      <p className="text-gray-600 mb-2 font-semibold">
        Start Date: {formatDate(room.start_date)}
      </p>
      <p className="text-gray-600 mb-2 font-semibold">
        Time: {formatTime(room.start_time)} - {formatTime(room.end_time)}
      </p>
      <p className="text-gray-600 mb-2 font-semibold">
        Status: {room.locked ? 'Locked' : 'Open'}
      </p>      
      <Link
        href={dashboard.showRoom.path({id: room.id})}
        className="mt-4 inline-block bg-blue-500 text-white font-medium py-3 px-4 rounded hover:bg-blue-600"
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
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    )}
  </div>
);

const RoomsExplore = ({ rooms, query = '' }) => {    
  return (    
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-4">Explore Rooms</h1>
      <SearchForm initialQuery={query} />
      <RoomsList title="Rooms you can join" rooms={rooms} />
    </div>
  );
};

export default RoomsExplore;