import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { createConsumer } from "@rails/actioncable";
import { ArrowLeft } from 'lucide-react';
import {dashboard} from '~/api'

const TopicChat = ({ chatMessages, room, topic, user_email, admin_email }) => {
  const [messages, setMessages] = useState(chatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messageListRef = useRef(null);
  const channelRef = useRef(null);

  useEffect(() => {
    const cable = createConsumer();
    channelRef.current = cable.subscriptions.create(
      { 
        channel: 'TopicChatChannel', 
        room_id: room.id, 
        topic_id: topic.id 
      },
      {
        connected: () => {
          console.log('Connected to TopicChatChannel');
          setIsConnected(true);
        },
        disconnected: () => {
          console.log('Disconnected from TopicChatChannel');
          setIsConnected(false);
        },
        received: (data) => {
          setMessages(prevMessages => [...prevMessages, data]);
        },
      }
    );

    return () => {
      cable.disconnect();
    };
  }, [room.id, topic.id]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    channelRef.current.perform('send_message', {
      body: newMessage,
      topic_id: topic.id,
      room_id: room.id
    });
    
    setNewMessage('');
  };

  const isAdmin = (email) => email === admin_email;
  const isCurrentUser = (email) => email === user_email;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Head title={`${topic.title} - ${room.course.title}`} />
      
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <div className="mb-6">
              <Link
                href={dashboard.showRoom.path({id: room.id})}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Room
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                {topic.title}
              </h1>
              <p className="text-sm text-gray-500">
                {room.course.title} • {isConnected ? 
                  <span className="text-green-500">Connected</span> : 
                  <span className="text-red-500">Disconnected</span>
                }
              </p>
            </div>

            <div 
              ref={messageListRef}
              className="space-y-4 h-[60vh] overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg"
            >
              {messages.map((message, index) => {
                const isMessageFromAdmin = isAdmin(message.user.email);
                const isMessageFromUser = isCurrentUser(message.user.email);

                return (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-3 ${isMessageFromUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <div className="flex-shrink-0">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center
                          ${isMessageFromAdmin ? 'bg-yellow-100' : 'bg-blue-100'}`}
                      >
                        <span 
                          className={`text-sm
                            ${isMessageFromAdmin ? 'text-yellow-600' : 'text-blue-500'}`}
                        >
                          {message.user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div 
                      className={`flex-1 p-3 rounded-lg shadow-sm max-w-[80%]
                        ${isMessageFromAdmin ? 'bg-yellow-50 border-2 border-yellow-200' : 
                          isMessageFromUser ? 'bg-blue-50 ml-auto' : 'bg-white'}`}
                    >
                      <p className={`text-sm font-medium
                        ${isMessageFromAdmin ? 'text-yellow-800' : 'text-gray-900'}`}
                      >
                        {message.user.email}
                        {isMessageFromAdmin && 
                          <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                            Admin
                          </span>
                        }
                      </p>
                      <p className={`text-sm mt-1
                        ${isMessageFromAdmin ? 'text-yellow-700' : 
                          isMessageFromUser ? 'text-blue-700' : 'text-gray-700'}`}
                      >
                        {message.message || message.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <form 
              onSubmit={handleMessageSubmit}
              className="flex space-x-2"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicChat;