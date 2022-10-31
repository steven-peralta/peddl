import {
  PostSettingsRequest,
  PostSettingsResponse,
  Settings,
} from '@peddl/common';
import { Collection } from 'mongodb';
import { genid } from '../utils';

export async function createSettings(
  userId: string,
  settings: PostSettingsRequest,
  collection: Collection<Settings>
): Promise<PostSettingsResponse> {
  const existingSettings = await collection.findOne({ createdBy: userId });

  if (existingSettings) {
    throw new Error('Settings already exist for that user.');
  }

  const id = genid();
  await collection.insertOne({
    id,
    createdBy: userId,
    createdAt: new Date(),
    ...settings,
  });

  return { id };
}

export async function getSettings(
  userId: string,
  collection: Collection<Settings>
): Promise<Settings | null> {
  return collection.findOne({ createdBy: userId });
}
