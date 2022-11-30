import {
  CreateThreadBody,
  EditThreadBody,
  HTTPStatus,
  IDResponse,
  PagedResponse,
  Pagination,
  Thread,
} from '@peddl/common';
import { db } from '../db';
import APIError from '../error/APIError';
import getDateMetadata from './utils';
import { genid, removeEmpty } from '../utils';

export const threadsCollection = db.collection<Thread>('threads');

export async function throw404IfThreadNotFound(id: string) {
  const threadExists = await threadsCollection.countDocuments({ id });

  if (!threadExists) {
    throw new APIError(HTTPStatus.NOT_FOUND, "Thread doesn't exist");
  }
}

export async function throw401IfUserNotInThread(
  userId: string,
  threadId: string
) {
  const count = await threadsCollection.countDocuments({
    id: threadId,
    users: { $in: [userId] },
  });

  if (count === 0) {
    throw new APIError(
      HTTPStatus.UNAUTHORIZED,
      "User isn't in specified thread."
    );
  }
}

export async function getThread(id: string) {
  return threadsCollection.findOne({ id });
}

export async function createThread(
  data: CreateThreadBody
): Promise<IDResponse> {
  const id = genid();
  await threadsCollection.insertOne({
    ...data,
    ...getDateMetadata(),
    id,
    latestMessage: '',
  });
  return { id };
}

export async function deleteThread(id: string) {
  await threadsCollection.findOneAndDelete({ id });
}

export async function getThreadsByUser(
  userId: string,
  { skip = 0, limit = 0 }: Pagination
): Promise<PagedResponse<Thread>> {
  const totalCount = await threadsCollection.countDocuments({ userId });
  const items = await threadsCollection
    .find({ users: { $in: [userId] } })
    .skip(skip)
    .limit(limit)
    .toArray();

  return {
    items,
    totalCount,
  };
}

export async function updateThread(id: string, data: EditThreadBody) {
  const $set = removeEmpty({ ...data, lastUpdated: new Date() });
  await threadsCollection.updateOne({ id }, { $set });
}
