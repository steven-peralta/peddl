import { Media, PagedResponse } from '@peddl/common';
import { genid } from '../utils';
import { db } from '../db';

export const mediaCollection = db.collection<Media>('media');

export async function createMedia(userId: string, filePath: string) {
  const id = genid();

  await mediaCollection.insertOne({
    createdBy: userId,
    createdAt: new Date(),
    id,
    filePath,
  });

  return { id };
}

export async function createMassMedia(userId: string, filePaths: string[]) {
  const promises = filePaths.map((filePath) => createMedia(userId, filePath));
  const results = await Promise.all(promises);
  const ids = results.map((result) => result.id);
  return { ids };
}

export async function getMedia(userId: string): Promise<PagedResponse<Media>> {
  const items = await mediaCollection.find({ createdBy: userId }).toArray();
  return {
    items,
    count: items.length,
  };
}
