// frontend/src/hooks/useSocket.js
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (serverUrl) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(serverUrl, {
      transports: ['websocket'],
      timeout: 5000,
    });

    const socket = socketRef.current;

    // Connection event handlers
    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', (reason) => {
      setIsConnected(false);
      console.log('Socket disconnected:', reason);
    });

    socket.on('connect_error', (error) => {
      setError(error.message);
      console.error('Socket connection error:', error);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [serverUrl]);

  const emit = (event, data) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  };

  const on = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  };

  const off = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  };

  const joinRoom = (roomId) => {
    emit('join-room', roomId);
  };

  return {
    socket: socketRef.current,
    isConnected,
    error,
    emit,
    on,
    off,
    joinRoom
  };
};

export default useSocket;
