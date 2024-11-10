import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { createConsumer } from "@rails/actioncable";
import { ArrowLeft } from 'lucide-react';
import {dashboard} from '~/api';

const ChatRoom = ({ chatMessages, room, user_email, admin_email }) => {
  const [messages, setMessages] = useState(chatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [cable, setCable] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const messageListRef = useRef(null);

  useEffect(() => {
    const cable = createConsumer();
    const channel = cable.subscriptions.create(
      { channel: 'CourseChatChannel', room_id: room.id, course_id: room.course.id },
      {
        connected: () => {
          console.log('Connected to ChatChannel');
          setIsConnected(true);
        },
        disconnected: () => {
          console.log('Disconnected from ChatChannel');
          setIsConnected(false);
        },
        received: (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
        },
      }
    );
    setCable(cable);
    setChannel(channel);
    return () => {
      cable.disconnect();
    };
  }, [room.id, room.course.id]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      channel.perform('send_message', { body: newMessage });
      setNewMessage('');
    }
  };

  const isAdmin = (email) => email === admin_email;
  const isCurrentUser = (email) => email === user_email;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <Link
          href={dashboard.showRoom.path({id: room.id})}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-3 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Room
        </Link>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{room.course.title}</h2>
          <p className="text-sm text-gray-500">
            Course Chat • {isConnected ? 
              <span className="text-green-500">Connected</span> : 
              <span className="text-red-500">Disconnected</span>
            }
          </p>
        </div>
      </div>
      
      <div 
        className="flex-1 p-6 overflow-y-auto bg-gray-50" 
        ref={messageListRef}
      >
        {messages.map((message, index) => {
          const isMessageFromAdmin = isAdmin(message.user.email);
          const isMessageFromUser = isCurrentUser(message.user.email);

          return (
            <div 
              key={index} 
              className={`mb-4 flex items-start space-x-3 ${isMessageFromUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className="flex-shrink-0">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${isMessageFromAdmin ? 'bg-yellow-100' : 'bg-blue-100'}`}
                >
                  <span 
                    className={`text-sm font-medium
                      ${isMessageFromAdmin ? 'text-yellow-600' : 'text-blue-600'}`}
                  >
                    {message.user.email[0].toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 max-w-[80%]">
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
                <div 
                  className={`mt-1 text-sm rounded-lg p-3 shadow-sm
                    ${isMessageFromAdmin ? 'bg-yellow-50 border-2 border-yellow-200 text-yellow-700' : 
                      isMessageFromUser ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-700'}`}
                >
                  {message.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border-t p-4">
        <form className="flex space-x-3" onSubmit={handleMessageSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
  );
};

export default ChatRoom;