import {
  CreateUserBody,
  EditUserBody,
  HTTPStatus,
  IDResponse,
  LoginBody,
  SearchPreferences,
  Token,
  TokenData,
  User,
} from '@peddl/common';
import * as crypto from 'crypto';
import { db } from '../db';
import APIError from '../error/APIError';
import { genid, removeEmpty } from '../utils';
import getDateMetadata from './utils';
import { signToken } from '../auth';

export const usersCollection = db.collection<User>('users');

export async function throw404IfUserNotFound(id: string) {
  const userExists = await usersCollection.countDocuments({ id });

  if (!userExists) {
    throw new APIError(HTTPStatus.NOT_FOUND, "User doesn't exist");
  }
}

export async function throw409IfUserFound(email: string) {
  const userExists = await usersCollection.countDocuments({ email });

  if (userExists) {
    throw new APIError(HTTPStatus.CONFLICT, 'User already exists');
  }
}

export async function throw404IfUsersNotFound(
  userId: string,
  createdBy: string
) {
  const userExists = await usersCollection.countDocuments({ id: createdBy });
  const likedUserExists = await usersCollection.countDocuments({ id: userId });

  if (!userExists) {
    throw new APIError(HTTPStatus.NOT_FOUND, `User ${createdBy} not found.`);
  }

  if (!likedUserExists) {
    throw new APIError(HTTPStatus.NOT_FOUND, `User ${userId} not found.`);
  }
}

export async function getToken({ email, password }: LoginBody): Promise<Token> {
  const user = await usersCollection.findOne({ email });

  if (!user) {
    throw new APIError(HTTPStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  const { id: userId, password: hash, salt } = user;
  const hmac = crypto.createHmac('sha512', salt);
  hmac.update(password);

  if (hmac.digest('base64') === hash) {
    const data: TokenData = {
      userId,
      time: new Date(),
    };
    return { userId, token: signToken(data) };
  }
  throw new APIError(HTTPStatus.UNAUTHORIZED, 'Invalid email or password');
}

export async function getUser(
  id: string
): Promise<Omit<User, 'salt' | 'password'> | undefined> {
  const user = await usersCollection.findOne({ id });

  if (user) {
    return {
      id: user.id,
      email: user.email,
      searchPreferences: user.searchPreferences,
      createdAt: user.createdAt,
      lastUpdated: user.lastUpdated,
    };
  }

  return undefined;
}

export async function createUser({
  email,
  password,
  searchPreferences,
}: Omit<CreateUserBody, 'profile'>): Promise<IDResponse> {
  const salt = crypto.randomBytes(16).toString('base64');
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const hashedPassword = hash.digest('base64');
  const id = genid();

  await usersCollection.insertOne({
    id,
    email,
    password: hashedPassword,
    salt,
    searchPreferences: searchPreferences as SearchPreferences,
    ...getDateMetadata(),
  });

  return { id };
}

export async function updateUser(
  id: string,
  { email, password, searchPreferences }: EditUserBody
): Promise<void> {
  let salt: string | undefined;
  let hash: crypto.Hmac;
  let hashedPassword: string | undefined;

  // if the user is changing their password
  if (password) {
    salt = crypto.randomBytes(16).toString('base64');
    hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    hashedPassword = hash.digest('base64');
  }

  if (hashedPassword) {
    const $set = removeEmpty({
      email,
      searchPreferences: searchPreferences as SearchPreferences,
      password: hashedPassword,
      salt,
      lastUpdated: new Date(),
    });

    await usersCollection.updateOne(
      { id },
      {
        $set,
      }
    );
  } else {
    const $set = removeEmpty({
      email,
      searchPreferences: searchPreferences as SearchPreferences,
      lastUpdated: new Date(),
    });
    await usersCollection.updateOne(
      { id },
      {
        $set,
      }
    );
  }
}

export async function deleteUser(id: string) {
  await usersCollection.findOneAndDelete({ id });
}
