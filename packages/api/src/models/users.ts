import {
  PostUserRequest,
  PostUserResponse,
} from '@peddl/common/dist/api/types';
import { Collection } from 'mongodb';
import { User } from '@peddl/common';
import * as crypto from 'crypto';
import { nanoid } from 'nanoid';

export default async function createUser(
  user: PostUserRequest,
  collection: Collection<User>
): Promise<PostUserResponse> {
  const { email, password } = user;
  const existingUser = await collection.findOne({ email });

  if (existingUser) {
    throw new Error('User already exists in the database.');
  }

  const salt = crypto.randomBytes(16).toString('base64');
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const hashedPassword = hash.digest('base64');
  const id = nanoid();

  await collection.insertOne({
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
