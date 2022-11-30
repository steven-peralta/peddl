import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { HTTPStatus } from '@peddl/common';
import { parsePaginationParams, parseSearchPreferencesParams } from '../utils';
import { getProfiles } from '../models/profiles';
import { authenticatedRoute, getAuth } from '../auth';
import APIError from '../error/APIError';

const router = express.Router();

router.get(
  '/',
  authenticatedRoute,
  asyncHandler(async (req: Request, res: Response) => {
    const searchPreferences = parseSearchPreferencesParams(req);
    const paginationParams = parsePaginationParams(req);
    const auth = getAuth(req);
    if (!auth) {
      throw new APIError(HTTPStatus.UNAUTHORIZED, 'No token provided');
    }

    const { userId } = auth;

    res.json(await getProfiles(searchPreferences, paginationParams, userId));
  })
);

export default router;
