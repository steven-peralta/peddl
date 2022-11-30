import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { expressjwt, Request as JWTRequest } from 'express-jwt';
import {
  CreateMessageBody,
  CreateThreadBody,
  EditThreadBody,
  HTTPStatus,
  IDResponse,
  TokenData,
} from '@peddl/common';
import { getAuth, jwtSettings } from '../auth';
import APIError from '../error/APIError';
import {
  createThread,
  deleteThread,
  getThread,
  throw401IfUserNotInThread,
  throw404IfThreadNotFound,
  updateThread,
} from '../models/threads';
import { APIRequest } from './utils';
import { throw404IfUserNotFound } from '../models/users';
import { throw401IfUsersNotMutual } from '../models/likes';
import {
  createMessage,
  deleteMessagesInThread,
  getMessage,
  getMessagesByThread,
} from '../models/messages';
import { parsePaginationParams } from '../utils';

const router = express.Router();

router.use(expressjwt(jwtSettings));

router.use(
  '/:threadId',
  asyncHandler(async (req: JWTRequest<TokenData>, _res, next) => {
    const { threadId } = req.params;

    await throw404IfThreadNotFound(threadId);

    if (!req.auth) {
      throw new APIError(HTTPStatus.UNAUTHORIZED, 'No token provided');
    }
    const { userId } = req.auth;

    await throw401IfUserNotInThread(userId, threadId);

    next();
  })
);

router.post(
  '/',
  asyncHandler(
    async (req: APIRequest<CreateThreadBody>, res: Response<IDResponse>) => {
      const { users } = req.body;

      await Promise.all(
        users.map(async (userId) => {
          await throw404IfUserNotFound(userId);
        })
      );

      await throw401IfUsersNotMutual(users);

      res.json(await createThread(req.body));
    }
  )
);

router
  .route('/:threadId')
  .get(
    asyncHandler(async (req: Request, res: Response) => {
      const { threadId } = req.params;
      res.json(await getThread(threadId));
    })
  )
  .put(
    asyncHandler(async (req: APIRequest<EditThreadBody>, res: Response) => {
      const { threadId } = req.params;
      const { users } = req.body;
      if (users) {
        await throw401IfUsersNotMutual(users);
      }

      await updateThread(threadId, req.body);

      res.status(200).end();
    })
  )
  .delete(
    asyncHandler(async (req: Request, res: Response) => {
      const { threadId } = req.params;
      await deleteMessagesInThread(threadId);
      await deleteThread(threadId);

      res.status(HTTPStatus.OK).end();
    })
  );

router
  .route('/:threadId/messages')
  .get(
    asyncHandler(async (req: Request, res: Response) => {
      const { threadId } = req.params;
      const pagination = parsePaginationParams(req);
      res.json(await getMessagesByThread(threadId, pagination));
    })
  )
  .post(
    asyncHandler(async (req: APIRequest<CreateMessageBody>, res: Response) => {
      // TODO add messages validation
      const auth = getAuth(req);
      if (!auth) {
        throw new APIError(HTTPStatus.UNAUTHORIZED, 'No token provided');
      }

      const { userId } = auth;
      const { threadId } = req.params;

      res.json(await createMessage(threadId, userId, req.body));
    })
  );

router.route('/:threadId/messages/:messageId').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { messageId } = req.params;
    res.json(await getMessage(messageId));
  })
);

export default router;
