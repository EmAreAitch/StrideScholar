import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

const CoursesPage = ({ enrolled_courses, created_courses, user }) => {
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

  const CourseCard = ({ course, type }) => (
    <div className="bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{course.title}</h3>
          <p className="text-sm text-gray-500">
            {type === 'enrolled' ? 'Enrolled Course' : 'Created Course'}
          </p>
        </div>
        
        <p className="text-gray-600 mb-4">{course.description}</p>
        
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>{course.topics_count} topics</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Created {new Date(course.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ message }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-500 text-center">{message}</p>
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
      <Head title="My Courses" />
      
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

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="mt-2 text-gray-600">Manage your enrolled and created courses</p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Enrolled Courses Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Enrolled Courses</h2>
            <div className="space-y-4">
              {enrolled_courses.length > 0 ? (
                enrolled_courses.map((course) => (
                  <CourseCard 
                    key={`enrolled-${course.id}`} 
                    course={course} 
                    type="enrolled" 
                  />
                ))
              ) : (
                <EmptyState message="You haven't enrolled in any courses yet." />
              )}
            </div>
          </section>

          {/* Created Courses Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Created Courses</h2>
            <div className="space-y-4">
              {created_courses.length > 0 ? (
                created_courses.map((course) => (
                  <CourseCard 
                    key={`created-${course.id}`} 
                    course={course} 
                    type="created" 
                  />
                ))
              ) : (
                <EmptyState message="You haven't created any courses yet." />
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

export default CoursesPage;