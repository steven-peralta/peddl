import express from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import {
  ServerboundEvents,
  ServerboundLoginPayload,
  TokenData,
} from '@peddl/common';

const port = 8000;
const secret = process.env['JWT_TOKEN_SECRET'] ?? 'helloworld';

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

const socketIdToUserId: Record<string, string> = {};
const userIdToSocket: Record<string, Socket> = {};

wss.on('connection', (socket) => {
  console.log('Socket connected.');

  socket.on(ServerboundEvents.Login, (data: ServerboundLoginPayload) => {
    const { token } = data;
    const { userId } = jwt.verify(token, secret, {
      algorithms: ['HS256'],
    }) as TokenData;

    if (userId === data.userId) {
      socketIdToUserId[socket.id] = userId;
      userIdToSocket[userId] = socket;
    }
  });

  socket.on(ServerboundEvents.Logout, () => {
    const userId = socketIdToUserId[socket.id];
    if (userId) {
      delete userIdToSocket[userId];
      delete socketIdToUserId[socket.id];
    }
  });

  socket.on('disconnect', () => {
    const userId = socketIdToUserId[socket.id];
    if (userId) {
      delete userIdToSocket[userId];
      delete socketIdToUserId[socket.id];
    }
  });
});

httpServer.listen(port, () => {
  console.log(`wss server started on port ${port}.`);
});
