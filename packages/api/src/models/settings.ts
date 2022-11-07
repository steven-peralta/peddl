import {
  PostSettingsRequest,
  PostSettingsResponse,
  Settings,
} from '@peddl/common';
import { genid } from '../utils';
import { db } from '../db';

export const settingsCollection = db.collection<Settings>('settings');

export async function createSettings(
  userId: string,
  settings: PostSettingsRequest
): Promise<PostSettingsResponse> {
  const existingSettings = await settingsCollection.findOne({
    createdBy: userId,
  });

  if (existingSettings) {
    throw new Error('Settings already exist for that user.');
  }

  const id = genid();
  await settingsCollection.insertOne({
    id,
    createdBy: userId,
    createdAt: new Date(),
    ...settings,
  });

  return { id };
}

export async function getSettings(userId: string): Promise<Settings | null> {
  return settingsCollection.findOne({ createdBy: userId });
}
