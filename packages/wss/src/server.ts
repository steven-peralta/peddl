import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import APP_NAME from '@peddl/common';

const app = express();

const httpServer = createServer(app);
const wss = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const port = 8000;

wss.on('connection', (socket) => {
  console.log('Socket connected.');

  socket.on('ping', () => {
    socket.emit('pong');
  });
});

httpServer.listen(port);
console.log(`${APP_NAME} wss server started on port ${port}.`);
