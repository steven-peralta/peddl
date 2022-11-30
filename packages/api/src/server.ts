import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { mongoClient } from './db';
import handleError from './error/handleError';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import profileRouter from './routers/profileRouter';
import threadRouter from './routers/threadRouter';

const port = process.env['PORT'] ?? '8080';

const app = express();

mongoClient.connect().then(() => {
  app.use(cors());
  app.use(json());
  app.use(morgan('combined'));
  app.use(express.static('static/'));

  app.use('/auth', authRouter);
  app.use('/users', userRouter);
  app.use('/profiles', profileRouter);
  app.use('/threads', threadRouter);

  app.use(handleError);

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
