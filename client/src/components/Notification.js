// src/components/Notification.js
import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('bugCreated', (newBug) => {
      setNotifications((prev) => [...prev, { type: 'created', bug: newBug }]);
    });

    socket.on('bugUpdated', (updatedBug) => {
      setNotifications((prev) => [...prev, { type: 'updated', bug: updatedBug }]);
    });

    socket.on('bugDeleted', (deletedBugId) => {
      setNotifications((prev) => [...prev, { type: 'deleted', bugId: deletedBugId }]);
    });

    return () => {
      socket.off('bugCreated');
      socket.off('bugUpdated');
      socket.off('bugDeleted');
    };
  }, [socket]);

  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <div key={index} className={`notification ${notification.type}`}>
          {notification.type === 'created' && <p>New Bug Created: {notification.bug.title}</p>}
          {notification.type === 'updated' && <p>Bug Updated: {notification.bug.title}</p>}
          {notification.type === 'deleted' && <p>Bug Deleted: {notification.bugId}</p>}
        </div>
      ))}
    </div>
  );
};

export default Notification;
