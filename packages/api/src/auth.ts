import jwt, { Algorithm } from 'jsonwebtoken';
import { Request as JWTRequest } from 'express-jwt';

export type TokenData = {
  userId: string;
  time: Date;
};

export const secret = 'helloworld';

export const jwtSettings = { secret, algorithms: ['HS256'] as Algorithm[] };

export const signToken = (data: TokenData) =>
  jwt.sign(data, secret, { algorithm: 'HS256' });

export const getAuth = (req: JWTRequest<TokenData>) => req.auth;
