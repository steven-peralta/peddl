import express, { Response } from 'express';
import { LoginBody, Token } from '@peddl/common';
import asyncHandler from 'express-async-handler';
import { getToken } from '../models/users';
import { APIRequest } from './utils';

const router = express.Router();

router.post(
  '/',
  asyncHandler(async (req: APIRequest<LoginBody>, res: Response<Token>) => {
    res.json(await getToken(req.body));
  })
);

export default router;
