import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  CreateUserBody,
  EditProfileBody,
  EditUserBody,
  HTTPStatus,
  IDResponse,
  Profile,
  User,
  validateAgeRange,
  validateBandcampUsername,
  validateBio,
  validateBirthday,
  validateEmail,
  validateGender,
  validateGenders,
  validateGenres,
  validateLocation,
  validateLocations,
  validateName,
  validatePassword,
  validateSoundcloudUsername,
  validateSpotifyLink,
  validateTalents,
  validateForm,
} from '@peddl/common';
import multer from 'multer';
import { APIRequest } from './utils';
import { parsePaginationParams, throw400OnBadValidation } from '../utils';
import {
  createUser,
  deleteUser,
  getUser,
  throw404IfUserNotFound,
  throw404IfUsersNotFound,
  throw409IfUserFound,
  updateUser,
} from '../models/users';
import { authenticatedRoute, authenticatedUserIdRoute } from '../auth';
import {
  createProfile,
  deleteProfile,
  getProfile,
  throw404IfProfileNotFound,
  updateProfile,
} from '../models/profiles';
import APIError from '../error/APIError';
import {
  createLike,
  deleteLike,
  getLike,
  getLikes,
  throw404IfLikeNotFound,
  throw409IfLikeFound,
} from '../models/likes';
import {
  createAllMedia,
  deleteMedia,
  getAllMedia,
  getMedia,
  throw404IfMediaNotFound,
  updateMedia,
} from '../models/media';
import { getThreadsByUser } from '../models/threads';

const storage = multer.diskStorage({
  destination: 'static/media/images/',
  filename(req, file, callback) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.originalname.split('.').pop();
    callback(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.use(
  '/:userId',
  asyncHandler(async (req, _res, next) => {
    const { userId } = req.params;
    await throw404IfUserNotFound(userId);
    next();
  })
);

router.use(
  '/:userId/likes/:likedUserId',
  asyncHandler(async (req, _res, next) => {
    const { userId, likedUserId } = req.params;
    await throw404IfUsersNotFound(likedUserId, userId);
    next();
  })
);

router.route('/').post(
  asyncHandler(
    async (req: APIRequest<CreateUserBody>, res: Response<IDResponse>) => {
      const { searchPreferences, profile, ...user } = req.body;
      const validateUser = validateForm<
        Omit<CreateUserBody, 'searchPreferences' | 'profile'>
      >(user, {
        email: validateEmail,
        password: validatePassword,
      });

      if (!searchPreferences) {
        throw new APIError(
          HTTPStatus.BAD_REQUEST,
          'Search preferences are required.'
        );
      }

      const validateSearchPreferences = validateForm<
        CreateUserBody['searchPreferences']
      >(searchPreferences, {
        ageRange: validateAgeRange,
        genders: validateGenders,
        genres: validateGenres,
        talents: validateTalents,
        locations: validateLocations,
      });

      if (!profile) {
        throw new APIError(HTTPStatus.BAD_REQUEST, 'Profile data is required');
      }

      const validateProfile = validateForm(profile, {
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

      throw400OnBadValidation({
        ...validateUser,
        ...validateSearchPreferences,
        ...validateProfile,
      });

      await throw409IfUserFound(user.email);
      const { id } = await createUser({ ...user, searchPreferences });
      await createProfile(id, profile);

      res.status(HTTPStatus.CREATED).json({ id });
    }
  )
);

router
  .route('/:userId')
  .get(
    authenticatedUserIdRoute,
    asyncHandler(
      async (req, res: Response<Omit<User, 'salt' | 'password'>>) => {
        const { userId } = req.params;

        res.json(await getUser(userId));
      }
    )
  )
  .put(
    authenticatedUserIdRoute,
    asyncHandler(async (req: APIRequest<EditUserBody>, res) => {
      const { userId } = req.params;
      const { searchPreferences = {}, ...user } = req.body;
      const validateUser = validateForm(
        user,
        {
          email: validateEmail,
          password: validatePassword,
        },
        true
      );

      const validateSearchPreferences = validateForm(
        searchPreferences,
        {
          ageRange: validateAgeRange,
          genders: validateGenders,
          genres: validateGenres,
          talents: validateTalents,
          locations: validateLocations,
        },
        true
      );

      throw400OnBadValidation(validateUser);
      throw400OnBadValidation(validateSearchPreferences);

      await updateUser(userId, req.body);

      res.status(HTTPStatus.OK).end();
    })
  )
  .delete(
    authenticatedUserIdRoute,
    asyncHandler(async (req, res) => {
      const { userId } = req.params;
      await deleteUser(userId);
      await deleteProfile(userId);
      await deleteMedia(userId);

      res.status(HTTPStatus.OK).end();
    })
  );

router
  .route('/:userId/profile')
  .get(
    authenticatedRoute,
    asyncHandler(async (req, res: Response<Profile | null>) => {
      const { userId } = req.params;
      await throw404IfProfileNotFound(userId);

      res.json(await getProfile(userId));
    })
  )
  .put(
    authenticatedUserIdRoute,
    asyncHandler(async (req: APIRequest<EditProfileBody>, res) => {
      const { userId } = req.params;
      const data = req.body;
      const validate = validateForm(
        data,
        {
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
        },
        true
      );

      throw400OnBadValidation(validate);

      await updateProfile(userId, data);
      res.status(HTTPStatus.OK).end();
    })
  );

router.get(
  '/:userId/likes',
  authenticatedUserIdRoute,
  asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { mutual } = req.query;
    const pagination = parsePaginationParams(req);
    res.json(await getLikes(userId, pagination, mutual === 'true'));
  })
);

router
  .route('/:userId/likes/:likedUserId')
  .get(
    authenticatedUserIdRoute,
    asyncHandler(async (req: Request, res: Response) => {
      const { userId, likedUserId } = req.params;
      await throw404IfLikeNotFound(likedUserId, userId);
      res.json(await getLike(likedUserId, userId));
    })
  )
  .post(
    authenticatedUserIdRoute,
    asyncHandler(async (req: Request, res: Response) => {
      const { userId, likedUserId } = req.params;
      await throw409IfLikeFound(likedUserId, userId);
      await createLike(likedUserId, userId);
      res.status(HTTPStatus.CREATED).end();
    })
  )
  .delete(
    authenticatedUserIdRoute,
    asyncHandler(async (req: Request, res: Response) => {
      const { userId, likedUserId } = req.params;
      await deleteLike(likedUserId, userId);
      res.status(HTTPStatus.OK).end();
    })
  );

router
  .route('/:userId/media')
  .get(
    authenticatedRoute,
    asyncHandler(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const pagination = parsePaginationParams(req);

      res.json(await getAllMedia(userId, pagination));
    })
  )
  .post(
    authenticatedUserIdRoute,
    upload.fields([
      { name: 'image0' },
      { name: 'image1' },
      { name: 'image2' },
      { name: 'image3' },
      { name: 'image4' },
      { name: 'image5' },
    ]),
    asyncHandler(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const filePaths = Object.values(files).map((f) => {
        const [file] = f;
        const [_, ...rest] = file.path.split('/');
        return rest.join('/');
      });
      res.json(await createAllMedia(userId, filePaths));
    })
  );

router
  .route('/:userId/media/:mediaId')
  .get(
    authenticatedRoute,
    asyncHandler(async (req: Request, res: Response) => {
      const { mediaId } = req.params;
      await throw404IfMediaNotFound(mediaId);
      res.json(await getMedia(mediaId));
    })
  )
  .put(
    authenticatedUserIdRoute,
    upload.single('image'),
    asyncHandler(async (req: Request, res: Response) => {
      const { mediaId } = req.params;

      if (!req.file) {
        throw new APIError(
          HTTPStatus.BAD_REQUEST,
          'No file included in request.'
        );
      }

      const [_, ...rest] = req.file.path.split('/');
      const filePath = rest.join('/');
      res.json(await updateMedia(mediaId, filePath));
    })
  )
  .delete(
    authenticatedUserIdRoute,
    asyncHandler(async (req: Request, res: Response) => {
      const { mediaId } = req.params;
      await deleteMedia(mediaId);
      res.status(HTTPStatus.OK).end();
    })
  );

router.get(
  '/:userId/threads',
  authenticatedUserIdRoute,
  asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const pagination = parsePaginationParams(req);
    res.json(await getThreadsByUser(userId, pagination));
  })
);

export default router;
