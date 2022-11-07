import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { mongoClient } from './db';
import setupRoutes from './routes';
import { likesCollection } from './models/likes';
import { mediaCollection } from './models/media';
import { profilesCollection } from './models/profiles';
import { settingsCollection } from './models/settings';
import { usersCollection } from './models/users';

const port = process.env['PORT'] ?? '8080';

const app = express();

mongoClient.connect().then(() => {
  const createDBIndicies = [
    likesCollection.createIndex({ userId: 1, createdBy: 1 }, { unique: true }),
    likesCollection.createIndex({ userId: 1, matches: 1 }),
    mediaCollection.createIndex({ id: 1 }, { unique: true }),
    mediaCollection.createIndex({ createdBy: 1 }),
    profilesCollection.createIndex({ id: 1 }, { unique: true }),
    profilesCollection.createIndexes([
      { key: { createdBy: 1 } },
      { key: { gender: 1 } },
      { key: { genres: 1 } },
      { key: { talents: 1 } },
      { key: { location: 1 } },
      { key: { birthday: 1 } },
    ]),
    settingsCollection.createIndex({ id: 1 }, { unique: true }),
    settingsCollection.createIndex({ createdBy: 1 }),
    usersCollection.createIndexes([{ key: { id: 1 } }, { key: { email: 1 } }], {
      unique: true,
    }),
  ];

  Promise.all(createDBIndicies).catch(console.error);

  app.use(cors());
  app.use(json());
  app.use(morgan('combined'));
  app.use(express.static('static/'));

  setupRoutes(app);

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
