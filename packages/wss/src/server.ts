import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import morgan from 'morgan';

const port = 8000;

const app = express();
app.use(morgan('combined'));
const httpServer = createServer(app);
const wss = new Server(httpServer, {
  path: '/',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

wss.on('connection', (socket) => {
  console.log('Socket connected.');

  socket.on('ping', () => {
    socket.emit('pong');
  });
});

httpServer.listen(port, () => {
  console.log(`wss server started on port ${port}`);
});
