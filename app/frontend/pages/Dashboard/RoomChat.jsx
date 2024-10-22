import React, { useState, useEffect, useRef } from 'react';
import { createConsumer } from "@rails/actioncable";

const ChatRoom = ({ chatMessages, room }) => {
  const [messages, setMessages] = useState(chatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [cable, setCable] = useState(null);
  const [channel, setChannel] = useState(null);
  const messageListRef = useRef(null);

  useEffect(() => {
    const cable = createConsumer();
    const channel = cable.subscriptions.create(
      { channel: 'CourseChatChannel', room_id: room.id, course_id: room.course.id },
      {
        connected: () => console.log('Connected to ChatChannel'),
        disconnected: () => console.log('Disconnected from ChatChannel'),
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

  return (
    <div className="chat-room flex flex-col h-1/3 max-w-xl mx-auto bg-white border border-gray-300">
      <div 
        className="message-list flex-1 p-4 overflow-y-auto" 
        ref={messageListRef}
      >
        {messages.map((message, index) => (
          <div key={index} className="message mb-2">
            <p className="text-sm text-gray-800">
              <b>{message.user.email}</b>: {message.message}
            </p>
          </div>
        ))}
      </div>
      <form className="message-form flex p-2 border-t" onSubmit={handleMessageSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button 
          type="submit" 
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
