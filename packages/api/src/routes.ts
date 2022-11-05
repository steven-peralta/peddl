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
  ErrorResponse,
  FailedValidationResponse,
  PostAuthRequest,
  PostAuthResponse,
  PostProfileRequest,
  PostSettingsRequest,
  PostUserRequest,
  Media,
} from '@peddl/common';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { expressjwt, Request as JWTRequest } from 'express-jwt';
import multer from 'multer';
import validateForm from './validation';
import createUser from './models/users';
import { createProfile, getProfiles } from './models/profiles';
import { createSettings, getSettings } from './models/settings';
import { createMassMedia, getMedia } from './models/media';
import { parseSettingsParams, SettingsQueryParams } from './utils';

type JWTToken = {
  userId: string;
  time: Date;
};

const jwtSecret = process.env['JWT_TOKEN_SECRET'] ?? 'foobar';

const storage = multer.diskStorage({
  destination: 'static/media/images/',
  filename(req, file, callback) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.originalname.split('.').pop();
    callback(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({ storage });

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
          userId,
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
        if (error instanceof Error) {
          res.json({ error: error.message } as ErrorResponse);
        } else {
          res.end();
        }
      }
    })
  );

  app.post(
    '/users/:userId/media',
    [
      upload.fields([
        { name: 'image0' },
        { name: 'image1' },
        { name: 'image2' },
        { name: 'image3' },
        { name: 'image4' },
        { name: 'image5' },
      ]),
      expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }),
    ],
    asyncHandler(async (req: JWTRequest<JWTToken>, res) => {
      const { auth } = req;
      if (!auth) {
        res.sendStatus(401);
        res.end();
        return;
      }
      const { userId } = auth;
      const { userId: userIdParam } = req.params;

      if (userId !== userIdParam) {
        res.sendStatus(401);
        return;
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const filePaths = Object.values(files).map((f) => {
        const [file] = f;
        const [_, ...rest] = file.path.split('/');
        return rest.join('/');
      });

      const media = db.collection<Media>('media');
      try {
        res.status(201);
        res.json(await createMassMedia(userId, filePaths, media));
      } catch (error) {
        res.status(500);
        if (error instanceof Error) {
          res.json({ error: error.message } as ErrorResponse);
        } else {
          res.end();
        }
      }
    })
  );

  app.get(
    '/users/:userId/media',
    asyncHandler(async (req: JWTRequest<JWTToken>, res) => {
      const { userId } = req.params;
      const media = db.collection<Media>('media');
      res.json(await getMedia(userId, media));
    })
  );

  app.get(
    '/users/:userId/settings',
    expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }),
    asyncHandler(async (req: JWTRequest<JWTToken>, res) => {
      const { auth } = req;
      if (!auth) {
        res.sendStatus(401);
        return;
      }
      const { userId } = auth;
      const { userId: userIdParam } = req.params;

      if (userId !== userIdParam) {
        res.sendStatus(401);
        return;
      }

      const settingsCollection = db.collection<Settings>('settings');
      const settings = await getSettings(userId, settingsCollection);

      if (!settings) {
        res.sendStatus(404);
        return;
      }

      res.json(settings);
    })
  );

  app.post(
    '/users/:userId/settings',
    expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }),
    asyncHandler(async (req: JWTRequest<JWTToken>, res) => {
      const { auth } = req;
      if (!auth) {
        res.sendStatus(401);
        return;
      }
      const { userId } = auth;
      const { userId: userIdParam } = req.params;

      if (userId !== userIdParam) {
        res.sendStatus(401);
        return;
      }

      const data = req.body as PostSettingsRequest;

      const settings = db.collection<Settings>('settings');
      try {
        res.status(201);
        res.json(await createSettings(userId, data, settings));
      } catch (error) {
        res.status(500);
        if (error instanceof Error) {
          res.json({ error: error.message } as ErrorResponse);
        } else {
          res.end();
        }
      }
    })
  );

  app.get(
    '/profiles',
    asyncHandler(async (req: JWTRequest<JWTToken>, res) => {
      const params = req.query as SettingsQueryParams;
      const settings = parseSettingsParams(params);
      const profiles = db.collection<Profile>('profiles');
      res.json(await getProfiles(settings, profiles));
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
        if (error instanceof Error) {
          res.json({ error: error.message } as ErrorResponse);
        } else {
          res.end();
        }
      }
    })
  );
};

export default setupRoutes;
