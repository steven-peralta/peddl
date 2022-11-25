import jwt, { Algorithm } from 'jsonwebtoken';
import { Request as JWTRequest } from 'express-jwt';
import { TokenData } from '@peddl/common';

export const secret = process.env['JWT_TOKEN_SECRET'] ?? 'helloworld';

export const jwtSettings = { secret, algorithms: ['HS256'] as Algorithm[] };

export const signToken = (data: TokenData) =>
  jwt.sign(data, secret, { algorithm: 'HS256' });

export const getAuth = (req: JWTRequest<TokenData>) => req.auth;
