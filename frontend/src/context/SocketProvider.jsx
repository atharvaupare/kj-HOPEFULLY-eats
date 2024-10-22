/* eslint-disable react/prop-types */
import React from 'react';
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const SocketContext = React.createContext(null);

export const SocketProvider = ({ children, userId }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:3000');

    socketInstance.on('connect', () => {
      console.log('Connected to socket server');
      // Authenticate socket with userId
      socketInstance.emit('authenticate', userId);
    });

    socketInstance.on('orderStatusUpdated', (data) => {
      toast.success(data.message, {
        duration: 4000,
        position: 'top-right',
      });
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      toast.error('Lost connection to server. Retrying...');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};