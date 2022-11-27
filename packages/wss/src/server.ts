import express from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import {
  ClientboundEvents,
  ClientboundMessagePayload,
  ServerboundEvents,
  ServerboundLoginPayload,
  ServerboundMessagePayload,
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

  socket.on(
    ServerboundEvents.SendMessage,
    ({
      threadId,
      toUserIds,
      userId,
      content,
      messageId,
    }: ServerboundMessagePayload) => {
      toUserIds.forEach((id) => {
        const receiver = userIdToSocket[id];
        if (receiver) {
          const data: ClientboundMessagePayload = {
            messageId,
            threadId,
            fromUserId: userId,
            content,
          };
          receiver.emit(`/threads/${threadId}`, data);
          receiver.emit(ClientboundEvents.ReceiveMessage, data);
        }
      });
    }
  );
});

httpServer.listen(port, () => {
  console.log(`wss server started on port ${port}.`);
});
