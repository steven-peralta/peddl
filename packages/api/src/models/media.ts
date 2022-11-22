import {
  HTTPStatus,
  ID,
  IDResponse,
  Media,
  PagedResponse,
  Pagination,
} from '@peddl/common';
import { genid } from '../utils';
import { db } from '../db';
import APIError from '../error/APIError';
import getDateMetadata from './utils';

export const mediaCollection = db.collection<Media>('media');

export async function throw404IfMediaNotFound(id: string) {
  const mediaExists = await mediaCollection.countDocuments({ id });

  if (!mediaExists) {
    throw new APIError(HTTPStatus.NOT_FOUND, "Media doesn't exist.");
  }
}

export async function updateMedia(id: string, filePath: string) {
  await mediaCollection.updateOne({ id }, { $set: { filePath } });
}

export async function deleteMedia(id: string) {
  await mediaCollection.findOneAndDelete({ id });
}

export async function deleteAllMedia(userId: string) {
  await mediaCollection.deleteMany({ createdBy: userId });
}

export async function createMedia(
  userId: string,
  filePath: string
): Promise<IDResponse> {
  const id = genid();

  await mediaCollection.insertOne({
    id,
    createdBy: userId,
    filePath,
    ...getDateMetadata(),
  });

  return { id };
}

export async function getMedia(id: string) {
  return mediaCollection.findOne({ id });
}

export async function getAllMedia(
  userId: string,
  { skip = 0, limit = 0 }: Pagination
): Promise<PagedResponse<Media>> {
  const totalCount = await mediaCollection.countDocuments({
    createdBy: userId,
  });
  const items = await mediaCollection
    .find({ createdBy: userId })
    .skip(skip)
    .limit(limit)
    .toArray();
  return {
    items,
    totalCount,
  };
}

export async function createAllMedia(
  userId: string,
  filePaths: string[]
): Promise<{ ids: ID[] }> {
  const promises = filePaths.map((filePath) => createMedia(userId, filePath));
  const results = await Promise.all(promises);
  const ids = results.map((result) => result.id);
  return { ids };
}
