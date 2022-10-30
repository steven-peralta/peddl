import * as crypto from 'crypto';
import { Express } from 'express';
import { Db } from 'mongodb';
import {
  Profile,
  User,
  Settings,
  validateEmail,
  validatePassword,
  validateBirthday,
  validateLocation,
  validateGender,
  validateGenres,
  validateTalents,
  validateBio,
  validateSpotifyLink,
  validateSoundcloudUsername,
  validateBandcampUsername,
  validateName,
} from '@peddl/common';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { expressjwt, Request as JWTRequest } from 'express-jwt';
import {
  ErrorResponse,
  FailedValidationResponse,
  PostAuthRequest,
  PostAuthResponse,
  PostProfileRequest,
  PostSettingsRequest,
  PostUserRequest,
} from '@peddl/common/dist/api/types';
import validateForm from './validation';
import createUser from './models/users';
import createProfile from './models/profiles';
import createSettings from './models/settings';

type JWTToken = {
  userId: string;
  time: Date;
};

const jwtSecret = process.env['JWT_TOKEN_SECRET'] ?? 'foobar';

const setupRoutes = (app: Express, db: Db) => {
  app.post(
    '/auth',
    asyncHandler(async (req, res) => {
      const { body } = req;
      const { email, password } = body as PostAuthRequest;
      const users = db.collection<User>('users');
      const user = await users.findOne({ email });

      if (!user) {
        res.status(404);
        res.json({ error: 'User not found' } as ErrorResponse);
        return;
      }

      const { id: userId, password: userHash, salt } = user;
      const hash = crypto.createHmac('sha512', salt);
      hash.update(password);

      if (hash.digest('base64') === userHash) {
        const token: JWTToken = {
          userId,
          time: new Date(),
        };

        res.status(200);
        res.json({
          token: jwt.sign(token, jwtSecret, { algorithm: 'HS256' }),
        } as PostAuthResponse);
      } else {
        res.status(401);
        res.json({ error: 'Incorrect email or password ' } as ErrorResponse);
      }
    })
  );
  app.post(
    '/users',
    asyncHandler(async (req, res) => {
      const data = req.body as PostUserRequest;
      const validationResults = validateForm(data, {
        email: validateEmail,
        password: validatePassword,
      });

      if (validationResults.length > 0) {
        const failedValidation: FailedValidationResponse = {
          errors: validationResults,
        };
        res.status(400);
        res.json(failedValidation);
        return;
      }

      const users = db.collection<User>('users');
      try {
        res.status(201);
        const newUser = await createUser(data, users);
        res.json(newUser);
      } catch (error) {
        res.status(500);
        res.json({ error } as ErrorResponse);
      }
    })
  );

  app.post(
    '/settings',
    expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }),
    asyncHandler(async (req: JWTRequest<JWTToken>, res) => {
      const { auth } = req;
      if (!auth) {
        res.sendStatus(401);
        return;
      }
      const { userId } = auth;
      const data = req.body as PostSettingsRequest;

      const settings = db.collection<Settings>('settings');
      try {
        res.status(201);
        res.json(await createSettings(userId, data, settings));
      } catch (error) {
        res.status(500);
        res.json({ error } as ErrorResponse);
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
        res.end();
        return;
      }
      const { userId } = auth;
      const data = req.body as PostProfileRequest;

      const validationResults = validateForm(data, {
        name: validateName,
        birthday: validateBirthday,
        location: validateLocation,
        gender: validateGender,
        genres: validateGenres,
        talents: validateTalents,
        bio: validateBio,
        spotifyLink: validateSpotifyLink,
        soundcloudUsername: validateSoundcloudUsername,
        bandcampUsername: validateBandcampUsername,
      });

      if (validationResults.length > 0) {
        const failedValidation: FailedValidationResponse = {
          errors: validationResults,
        };
        res.status(400);
        res.json(failedValidation);
        return;
      }

      const profiles = db.collection<Profile>('profiles');
      try {
        res.status(201);
        res.json(await createProfile(userId, data, profiles));
      } catch (error) {
        res.status(500);
        res.json({ error } as ErrorResponse);
      }
    })
  );
};

export default setupRoutes;
