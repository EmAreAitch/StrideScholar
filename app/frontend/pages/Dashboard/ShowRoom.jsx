import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Card, CardHeader, CardContent, Button, Badge } from './RoomComponents';
import {dashboard, enrollments, chat} from '~/api'
// app/javascript/Pages/Rooms/Show.jsx
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const RoomShow = ({ room, can_enroll, auth_user }) => {
  const { post, transform, processing } = useForm({
    room_id: room.id
  });

  const handleEnroll = () => {    
    post(enrollments.create.path());
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (timeString) => {
    return timeString.split('T')[1].slice(0,5)
  };

  const formatDuration = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600)); // 1 day = 24*3600 seconds
  seconds %= (24 * 3600); // Remaining seconds after extracting days
  const hours = Math.floor(seconds / 3600); // 1 hour = 3600 seconds
  seconds %= 3600; // Remaining seconds after extracting hours
  const minutes = Math.floor(seconds / 60); // 1 minute = 60 seconds
  seconds %= 60; // Remaining seconds

  let result = [];
  
  // Push days, hours, minutes, and seconds into the result array only if they exist
  if (days > 0) result.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours > 0) result.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) result.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  if (seconds > 0 || result.length === 0) result.push(`${seconds} second${seconds > 1 ? 's' : ''}`);

  return result.join(', ');
  };

  const InfoItem = ({ label, value }) => (
    <div className="flex items-center">
      <span className="text-gray-600 w-32">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );

 const TopicItem = ({ topic }) => (
    <div className="border-b border-gray-200 last:border-0 py-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{topic.title}</h3>
          <span className="text-sm text-gray-500">
            Duration: {formatDuration(topic.duration)}
          </span>
        </div>
        <Badge variant={getTopicTypeBadge(topic.topic_type)}>
          {formatTopicType(topic.topic_type)}
        </Badge>
      </div>
    </div>
  );

  // Helper function to format topic type
  const formatTopicType = (type) => {
    const types = {
      0: 'Theory',
      1: 'Practical',
      2: 'Assignment',
      3: 'Quiz'
    };
    return types[type] || 'Other';
  };

  // Helper function to get badge variant based on topic type
  const getTopicTypeBadge = (type) => {
    const variants = {
      0: 'default',    // Theory
      1: 'success',    // Practical
      2: 'warning',    // Assignment
      3: 'info'        // Quiz
    };
    return variants[type] || 'default';
  };

  return (
    <>
      <Head title={`${room.course.title} - Room Details`} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          {/* Existing CardHeader */}
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h1 className="text-2xl font-bold">{room.course.title}</h1>
            <p className="text-blue-100 mt-2">{room.course.description}</p>
          </CardHeader>

          <CardContent>
            {/* Existing grid with room info and enrollment status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Room Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Room Information</h2>
                
                <div className="space-y-3">
                  <InfoItem label="Room Head" value={room.user.email} />
                  <InfoItem label="Start Date" value={formatDate(room.start_date)} />
                  <InfoItem 
                    label="Time" 
                    value={`${formatTime(room.start_time)} - ${formatTime(room.end_time)}`} 
                  />
                  <InfoItem label="Days" value={DAYS.filter((_, index) => room.days & (1 << index)).join(', ')} />
                </div>
              </div>

              {/* Right Column - Enrollment Status */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Enrollment Status</h2>
                
                <div className="space-y-3">
                  <InfoItem 
                    label="Capacity" 
                    value={`${room.participants} participants`} 
                  />
                  <InfoItem 
                    label="Enrolled" 
                    value={`${room.enrollments_count} participants`} 
                  />
                  <div className="flex items-center">
                    <span className="text-gray-600 w-32">Status:</span>
                    <Badge variant={room.locked ? "destructive" : "success"}>
                      {room.locked ? 'Locked' : 'Open'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Duration section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Course Duration</h2>
              <p className="text-gray-700">
                {formatDuration(room.course.duration)}
              </p>
            </div>

            {/* New Topics Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Course Topics</h2>
              <Card className="bg-gray-50">
                <CardContent className="divide-y divide-gray-200">
                  {room.course.topics && room.course.topics.length > 0 ? (
                    room.course.topics.map((topic, index) => (
                      <TopicItem key={index} topic={topic} />
                    ))
                  ) : (
                    <p className="text-gray-500 py-4">No topics available for this course</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Existing Action Buttons */}
            <div className="mt-8 flex space-x-4">
              {can_enroll ? (
                <Button
                  onClick={handleEnroll}
                  disabled={processing}
                >
                  {processing ? 'Enrolling...' : 'Enroll Now'}
                </Button>) : (
                <Link href={chat.room.path({id: room.id})}>
                  <Button>
                    Room Chat
                  </Button>
                </Link>
              )}
              
              <Link href={dashboard.index.path()}>
                <Button variant="outline">
                  Back to Rooms
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RoomShow;