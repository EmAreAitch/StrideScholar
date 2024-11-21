import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import axios from 'axios';
import { Card, CardHeader, CardContent, Button, Badge } from './RoomComponents';
import { ChevronDown, ChevronUp, MessageCircle, GalleryVerticalEnd } from 'lucide-react';
import { apiCourse, chat, resources } from '~/api';
import { Notyf } from 'notyf';

const TopicItem = ({ topic, depth = 0, roomId, onProgressChange, parentUpdateCallback }) => {     
  const { authenticity_token } = usePage().props;
  const [completed, setCompleted] = useState(!!topic.completed);
  const [subtopics, setSubtopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setCompleted(!!topic.completed);
  }, [topic.completed]);

  useEffect(() => {
    if (subtopics.length > 0) {
      const allCompleted = subtopics.every(st => st.completed);
      if (allCompleted !== completed) {
        setCompleted(allCompleted);
        if (parentUpdateCallback) {
          parentUpdateCallback(topic.id, allCompleted);
        }
      }
    }
  }, [subtopics, completed, parentUpdateCallback, topic.id]);

  const handleSubtopics = async () => {
    if (subtopics.length === 0) {
      setIsLoading(true);
      try {
        const response = await axios.get(apiCourse.subtopics.path(), {
          params: { room_id: roomId, topicable_id: topic.id }
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

  const handleProgressUpdate = async (e) => {
    e.stopPropagation();
    const newStatus = e.target.checked;
    
    try {
      const response = await axios.patch(apiCourse.updateProgress.path(), {
        authenticity_token,
        topic_id: topic.id,
        room_id: roomId,
        status: newStatus
      });
      
      if (response.data.topics_completed !== undefined) {
        onProgressChange(response.data.topics_completed);
      }

      setCompleted(newStatus);
      
      if (subtopics.length > 0) {
        setSubtopics(prevSubtopics => 
          prevSubtopics.map(st => ({
            ...st,
            completed: newStatus
          }))
        );
      }

      if (parentUpdateCallback) {
        parentUpdateCallback(topic.id, newStatus);
      }

    } catch (error) {
      new Notyf().error(error.response.data.message)
    }
  };

  const handleSubtopicUpdate = (subtopicId, isCompleted) => {
    setSubtopics(prevSubtopics => 
      prevSubtopics.map(st =>
        st.id === subtopicId ? { ...st, completed: isCompleted } : st
      )
    );
  };

  const formatTopicType = (type) => {    
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const formatDuration = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= (24 * 3600);
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    let result = [];
    
    if (days > 0) result.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) result.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) result.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (seconds > 0 || result.length === 0) result.push(`${seconds} second${seconds > 1 ? 's' : ''}`);

    return result.join(', ');
  };

  const getTopicTypeBadge = (type) => {
    const variants = {
      article: 'default',
      project: 'success',
      video: 'warning',
      quiz: 'info'
    };
    return variants[type] || 'default';
  };

  const depthPadding = `${depth * 1}rem`;

  return (
    <div className="border-b border-gray-200 last:border-0">
      <div
        className={`py-4 ${topic.topics_count > 0 ? "cursor-pointer" : ""} hover:bg-blue-50 transition-colors`}
        onClick={topic.topics_count > 0 ? handleSubtopics : undefined}
        style={{ paddingLeft: depthPadding }}
      >
        <div className="flex justify-between items-start px-4">
          <div className="flex-1">            
            <div className="flex items-center gap-2">
              <div>
                <input 
                  type="checkbox" 
                  onChange={handleProgressUpdate} 
                  onClick={(e) => e.stopPropagation()} 
                  checked={completed}
                />
              </div>
              <h3 className={`font-medium text-gray-900 ${depth > 0 ? 'text-sm' : ''}`}>
                {topic.title}
                {topic.topics_count > 0 && ` - ${topic.topics_count} subtopic${topic.topics_count > 1 ? 's' : ''}`}
              </h3>
              {topic.topics_count > 0 && (isLoading ? (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              Duration: {formatDuration(topic.duration)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={resources.index.path({room_id:roomId, topic_id: topic.id})}
              className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <GalleryVerticalEnd size={20} />
            </Link>
            <Link
              href={chat.topic.path({id:roomId, topic_id: topic.id})}
              className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle size={20} />
            </Link>
            <Badge variant={getTopicTypeBadge(topic.topic_type)}>
              {formatTopicType(topic.topic_type)}
            </Badge>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className={`bg-gray-50 ${depth === 0 ? 'border-t border-gray-200' : ''}`}>
          {subtopics.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {subtopics.map((subtopic, index) => (
                <TopicItem 
                  key={subtopic.id || index}
                  topic={subtopic}
                  depth={depth + 1}
                  roomId={roomId}
                  onProgressChange={onProgressChange}
                  parentUpdateCallback={handleSubtopicUpdate}
                />
              ))}
            </div>
          ) : (
            <div className="px-6 py-4 text-gray-500" style={{ paddingLeft: `calc(${depthPadding} + 1.5rem)` }}>
              No subtopics available for this topic
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopicItem;