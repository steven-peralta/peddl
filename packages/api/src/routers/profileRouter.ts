import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { parsePaginationParams, parseSearchPreferencesParams } from '../utils';
import { getProfiles } from '../models/profiles';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const searchPreferences = parseSearchPreferencesParams(req);
    const paginationParams = parsePaginationParams(req);
    res.json(await getProfiles(searchPreferences, paginationParams));
  })
);

export default router;
