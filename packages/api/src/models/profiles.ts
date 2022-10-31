import {
  PagedResponse,
  PostProfileRequest,
  PostProfileResponse,
  Profile,
} from '@peddl/common';
import { Collection } from 'mongodb';
import genid from '../utils';

export async function createProfile(
  userId: string,
  profile: PostProfileRequest,
  collection: Collection<Profile>
): Promise<PostProfileResponse> {
  const existingProfile = await collection.findOne({ createdBy: userId });

  if (existingProfile) {
    throw new Error('Profile already exists for that user.');
  }

  const id = genid();
  await collection.insertOne({
    id,
    createdBy: userId,
    createdAt: new Date(),
    ...profile,
    birthday: new Date(profile.birthday),
  });

  return { id };
}

export async function getProfiles(
  collection: Collection<Profile>
): Promise<PagedResponse<Profile>> {
  const items = await collection.find().toArray();

  return {
    items,
    count: items.length,
  };
}
