import { PostUserRequest, PostUserResponse, User } from '@peddl/common';
import * as crypto from 'crypto';
import { genid } from '../utils';
import { db } from '../db';

export const usersCollection = db.collection<User>('users');

export default async function createUser(
  user: PostUserRequest
): Promise<PostUserResponse> {
  const { email, password } = user;
  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    throw new Error('User already exists in the database.');
  }

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
    createdAt: new Date(),
  });

  return {
    id,
  };
}
