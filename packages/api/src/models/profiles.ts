import {
  PostProfileRequest,
  PostProfileResponse,
} from '@peddl/common/dist/api/types';
import { Profile } from '@peddl/common';
import { Collection } from 'mongodb';
import { nanoid } from 'nanoid';

export default async function createProfile(
  userId: string,
  profile: PostProfileRequest,
  collection: Collection<Profile>
): Promise<PostProfileResponse> {
  const existingProfile = await collection.findOne({ createdBy: userId });

  if (existingProfile) {
    throw new Error('Profile already exists for that user.');
  }

  const id = nanoid();
  await collection.insertOne({
    id,
    createdBy: userId,
    createdAt: new Date(),
    ...profile,
    birthday: new Date(profile.birthday),
  });

  return { id };
}
