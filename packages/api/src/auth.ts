import jwt, { Algorithm } from 'jsonwebtoken';
import { expressjwt, Request as JWTRequest } from 'express-jwt';
import { HTTPStatus, TokenData } from '@peddl/common';
import asyncHandler from 'express-async-handler';
import APIError from './error/APIError';

export const secret = process.env['JWT_TOKEN_SECRET'] ?? 'helloworld';

export const jwtSettings = { secret, algorithms: ['HS256'] as Algorithm[] };

export const signToken = (data: TokenData) =>
  jwt.sign(data, secret, { algorithm: 'HS256' });

export const getAuth = (req: JWTRequest<TokenData>) => req.auth;

// middleware
export const authenticatedRoute = expressjwt(jwtSettings);

export const authenticatedUserIdRoute = [
  authenticatedRoute,
  asyncHandler(async (req: JWTRequest<TokenData>, _res, next) => {
    const { userId: userIdParam } = req.params;
    if (!req.auth) {
      throw new APIError(HTTPStatus.UNAUTHORIZED, 'No token provided');
    }
    const { userId } = req.auth;
    if (userIdParam !== userId) {
      throw new APIError(HTTPStatus.UNAUTHORIZED, 'Invalid token.');
    }
    next();
  }),
];
