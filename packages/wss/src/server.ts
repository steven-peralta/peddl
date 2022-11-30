import express from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import {
  ClientboundCreateThreadPayload,
  ClientboundDeleteThreadPayload,
  ClientboundEvents,
  ClientboundMatchedPayload,
  ClientboundMatchesPageMatchedPayload,
  ClientboundMatchesPageUnmatchedPayload,
  ClientboundMessagePayload,
  ClientboundUpdateThreadPayload,
  Like,
  Media,
  Profile,
  ServerboundCreateLikePayload,
  ServerboundCreateThreadPayload,
  ServerboundDeleteLikePayload,
  ServerboundDeleteThreadPayload,
  ServerboundEvents,
  ServerboundLoginPayload,
  ServerboundMessagePayload,
  ServerboundUpdateThreadPayload,
  TokenData,
} from '@peddl/common';
import { MongoClient } from 'mongodb';

const port = 8000;
const secret = process.env['JWT_TOKEN_SECRET'] ?? 'helloworld';
const dbConnectionURI =
  process.env['MONGO_URI'] ?? 'mongodb://admin:mongo@localhost:27017';
const dbName = process.env['MONGO_DB'] ?? 'peddl';

export const mongoClient = new MongoClient(dbConnectionURI);

export const db = mongoClient.db(dbName);
const app = express();

const socketIdToUserId: Record<string, string> = {};
const userIdToSocket: Record<string, Socket> = {};

export const profilesCollection = db.collection<Profile>('profiles');
export const mediaCollection = db.collection<Media>('media');
export const likesCollection = db.collection<Like>('likes');
app.use(morgan('combined'));
const httpServer = createServer(app);
const wss = new Server(httpServer, {
  path: '/',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
mongoClient.connect().then(() => {
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
      async ({
        threadId,
        toUserIds,
        userId,
        content,
        messageId,
      }: ServerboundMessagePayload) => {
        const fromUserProfile = await profilesCollection.findOne({
          createdBy: userId,
        });

        const [fromUserMedia] = await mediaCollection
          .find({
            createdBy: userId,
          })
          .toArray();

        toUserIds.forEach((id) => {
          const receiver = userIdToSocket[id];
          if (receiver) {
            const data: ClientboundMessagePayload = {
              messageId,
              threadId,
              fromUserId: userId,
              name: fromUserProfile?.name ?? 'A user',
              avatarSrc: fromUserMedia?.filePath ?? '',
              content,
            };
            receiver.emit(`/threads/${threadId}`, data);
            receiver.emit(ClientboundEvents.ReceiveMessage, data);
          }
        });
      }
    );

    socket.on(
      ServerboundEvents.UpdateThread,
      ({ threadId, latestMessage, users }: ServerboundUpdateThreadPayload) => {
        users.forEach((id) => {
          const receiver = userIdToSocket[id];
          if (receiver) {
            const data: ClientboundUpdateThreadPayload = {
              threadId,
              latestMessage,
            };
            receiver.emit(ClientboundEvents.UpdateThread, data);
          }
        });
      }
    );

    socket.on(
      ServerboundEvents.CreateThread,
      ({ threadId, users }: ServerboundCreateThreadPayload) => {
        users.forEach((id) => {
          const receiver = userIdToSocket[id];
          if (receiver) {
            const data: ClientboundCreateThreadPayload = {
              threadId,
              users,
            };
            receiver.emit(ClientboundEvents.CreateThread, data);
          }
        });
      }
    );

    socket.on(
      ServerboundEvents.DeleteThread,
      ({ threadId, users }: ServerboundDeleteThreadPayload) => {
        users.forEach((id) => {
          const receiver = userIdToSocket[id];
          if (receiver) {
            const data: ClientboundDeleteThreadPayload = {
              threadId,
            };
            receiver.emit(ClientboundEvents.DeleteThread, data);
          }
        });
      }
    );

    socket.on(
      ServerboundEvents.DeleteLike,
      async ({ userId, likedUserId }: ServerboundDeleteLikePayload) => {
        const likedUserSocket = userIdToSocket[likedUserId];
        socket.emit(ClientboundEvents.MatchesPageUnmatched, {
          userId: likedUserId,
        } as ClientboundMatchesPageUnmatchedPayload);
        if (likedUserSocket) {
          likedUserSocket.emit(ClientboundEvents.MatchesPageUnmatched, {
            userId,
          } as ClientboundMatchesPageUnmatchedPayload);
        }
      }
    );

    socket.on(
      ServerboundEvents.CreateLike,
      async ({ userId, likedUserId }: ServerboundCreateLikePayload) => {
        const like = await likesCollection.findOne({
          createdBy: userId,
          userId: likedUserId,
        });
        if (like) {
          if (like.mutual) {
            const likedUserSocket = userIdToSocket[likedUserId];
            const user = await profilesCollection.findOne({
              createdBy: userId,
            });
            const [userMedia] = await mediaCollection
              .find({
                createdBy: userId,
              })
              .toArray();
            const likedUser = await profilesCollection.findOne({
              createdBy: likedUserId,
            });
            const [likedUserMedia] = await mediaCollection
              .find({
                createdBy: likedUserId,
              })
              .toArray();

            if (user && likedUser) {
              const { name } = user;
              const { name: likedUserName } = likedUser;

              socket.emit(ClientboundEvents.Matched, {
                userId: likedUserId,
                name: likedUserName,
              } as ClientboundMatchedPayload);
              socket.emit(ClientboundEvents.MatchesPageMatched, {
                userId: likedUserId,
                name: likedUserName,
                avatarSrc: likedUserMedia.filePath,
              } as ClientboundMatchesPageMatchedPayload);
              if (likedUserSocket) {
                likedUserSocket.emit(ClientboundEvents.Matched, {
                  userId,
                  name,
                });
                likedUserSocket.emit(ClientboundEvents.MatchesPageMatched, {
                  userId,
                  name,
                  avatarSrc: userMedia.filePath,
                } as ClientboundMatchesPageMatchedPayload);
              }
            }
          }
        }
      }
    );
  });

  httpServer.listen(port, () => {
    console.log(`wss server started on port ${port}.`);
  });
});
