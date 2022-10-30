import {
  PostSettingsRequest,
  PostSettingsResponse,
} from '@peddl/common/dist/api/types';
import { Settings } from '@peddl/common';
import { Collection } from 'mongodb';
import { nanoid } from 'nanoid';

export default async function createSettings(
  userId: string,
  settings: PostSettingsRequest,
  collection: Collection<Settings>
): Promise<PostSettingsResponse> {
  const existingSettings = await collection.findOne({ createdBy: userId });

  if (existingSettings) {
    throw new Error('Settings already exist for that user.');
  }

  const id = nanoid();
  await collection.insertOne({
    id,
    createdBy: userId,
    createdAt: new Date(),
    ...settings,
  });

  return { id };
}
