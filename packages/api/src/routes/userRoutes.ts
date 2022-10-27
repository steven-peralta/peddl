import * as crypto from 'crypto';
import { Express } from 'express';
import { Db } from 'mongodb';
import {
  CreateProfileFormData,
  Profile,
  User,
  CreateUserFormData,
  WithoutID,
} from '@peddl/common';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { expressjwt, Request as JWTRequest } from 'express-jwt';
import { validateProfileFormData, validateUserFormData } from '../validation';

type JWTToken = {
  userId: string;
  time: Date;
};

const jwtSecret = process.env['JWT_TOKEN_SECRET'] ?? 'foobar';

const setupUserRoutes = (app: Express, db: Db) => {
  app.post(
    '/auth',
    asyncHandler(async (req, res) => {
      const { body } = req;
      const { email, password } = body as CreateUserFormData;
      const users = db.collection<User>('users');
      const user = await users.findOne({ email });
      if (!user) {
        res.status(404);
        res.json({ reason: 'User not found' });
        return;
      }
      const { _id: userId, password: userHash, salt } = user;
      const hash = crypto.createHmac('sha512', salt);
      hash.update(password);
      if (hash.digest('base64') === userHash) {
        const token: JWTToken = {
          userId,
          time: new Date(),
        };
        res.status(200);
        res.send(jwt.sign(token, jwtSecret, { algorithm: 'HS256' }));
      } else {
        res.status(401);
        res.json({ reason: 'Incorrect email or password ' });
      }
    })
  );
  app.post(
    '/users',
    asyncHandler(async (req, res) => {
      const { body } = req;
      const data = body as CreateUserFormData;
      const validationResults = validateUserFormData(data);

      if (!validationResults.isValid) {
        res.status(400);
        res.json(validationResults);
        return;
      }

      const { email, password } = data;
      const users = db.collection<WithoutID<User>>('users');
      const existingUser = await users.findOne({ email });

      if (!existingUser) {
        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        await users.insertOne({
          email,
          password: hash.digest('base64'),
          salt,
        });
        res.status(201);
        res.end();
      } else {
        res.status(409);
        res.json({ reason: 'User already exists' });
      }
    })
  );

  app.post(
    '/profiles',
    expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }),
    asyncHandler(async (req: JWTRequest<JWTToken>, res) => {
      const { auth } = req;
      if (!auth) {
        res.sendStatus(401);
        return;
      }
      const { userId } = auth;
      const data = req.body as CreateProfileFormData;
      const validationResults = validateProfileFormData(data);

      if (!validationResults?.isValid) {
        res.status(400);
        res.json(validationResults);
        return;
      }

      const profiles = db.collection<Profile>('profiles');
      const existingProfile = await profiles.findOne({ createdBy: userId });

      if (existingProfile) {
        res.status(409);
        res.json({ reason: 'Profile already exists for that user.' });
        return;
      }

      const profile = await profiles.insertOne({
        createdBy: userId,
        createdAt: new Date(),
        ...data,
        birthday: new Date(data.birthday),
      } as Profile);

      res.status(201);
      res.json({ _id: profile.insertedId });
    })
  );
};

export default setupUserRoutes;
