import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import APP_NAME from '@peddl/common';

const socket = io('http://localhost:8000');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState<string | null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  };

  return (
    <div>
      <h1>Welcome to {`${APP_NAME}`}</h1>
      <p>Connected: {`${isConnected}`}</p>
      <p>Last pong: {lastPong || '-'}</p>
      <button type="button" onClick={sendPing}>
        Send ping
      </button>
    </div>
  );
}

export default App;
