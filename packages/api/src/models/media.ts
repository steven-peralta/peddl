import { Collection } from 'mongodb';
import { Media } from '@peddl/common';
import genid from '../utils';

export async function createMedia(
  userId: string,
  filePath: string,
  collection: Collection<Media>
) {
  const id = genid();

  await collection.insertOne({
    createdBy: userId,
    createdAt: new Date(),
    id,
    filePath,
  });

  return { id };
}

export async function createMassMedia(
  userId: string,
  filePaths: string[],
  collection: Collection<Media>
) {
  const promises = filePaths.map((filePath) =>
    createMedia(userId, filePath, collection)
  );
  const results = await Promise.all(promises);
  const ids = results.map((result) => result.id);
  return { ids };
}
