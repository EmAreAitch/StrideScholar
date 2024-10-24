import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, Button, Badge } from './RoomComponents';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {apiCourse} from '~/api'

const TopicItem = ({ topic }) => {  
  const [subtopics, setSubtopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubtopics = async () => {
    if (subtopics.length == 0) {
      setIsLoading(true);
      try {
        const response = await axios.get(apiCourse.subtopics.path(), {
          params: { topicable_id: topic.id }
        });
        setSubtopics(response.data);
      } catch (error) {
        console.error('Error fetching subtopics:', error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsExpanded(!isExpanded);
  };

    // Helper function to format topic type
  const formatTopicType = (type) => {    
    return type.charAt(0).toUpperCase() + type.slice(1)

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

  // Helper function to get badge variant based on topic type
  const getTopicTypeBadge = (type) => {
    const variants = {
      article: 'default',    // Theory
      project: 'success',    // Practical
      video: 'warning',    // Assignment
      quiz: 'info'        // Quiz
    };
    return variants[type] || 'default';
  };

  return (
    <div className="border-b border-gray-200 last:border-0">
      <div
        className="py-4 cursor-pointer hover:bg-blue-50 transition-colors"
        onClick={handleSubtopics}
      >
        <div className="flex justify-between items-start px-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900">{topic.title}</h3>
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />
              )}
            </div>
            <span className="text-sm text-gray-500">
              Duration: {formatDuration(topic.duration)}
            </span>
          </div>
          <Badge variant={getTopicTypeBadge(topic.topic_type)}>
            {formatTopicType(topic.topic_type)}
          </Badge>
        </div>
      </div>

      {/* Subtopics section */}
      {isExpanded && (
        <div className="bg-gray-50 border-t border-gray-200">
          {subtopics.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {subtopics.map((subtopic, index) => (
                <div key={index} className="px-6 py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {subtopic.title}
                      </h4>
                      {subtopic.duration && (
                        <span className="text-sm text-gray-500">
                          Duration: {formatDuration(subtopic.duration)}
                        </span>
                      )}
                    </div>
                    {subtopic.topic_type !== undefined && (
                      <Badge
                        variant={getTopicTypeBadge(subtopic.topic_type)}
                        className="ml-2"
                      >
                        {formatTopicType(subtopic.topic_type)}
                      </Badge>
                    )}
                  </div>
                  {subtopic.description && (
                    <p className="mt-1 text-sm text-gray-600">
                      {subtopic.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-4 text-gray-500">
              No subtopics available for this topic
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopicItem