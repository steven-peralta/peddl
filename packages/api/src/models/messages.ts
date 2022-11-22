import {
  CreateMessageBody,
  EditMessageBody,
  Message,
  PagedResponse,
  Pagination,
} from '@peddl/common';
import { db } from '../db';
import { genid, removeEmpty } from '../utils';
import getDateMetadata from './utils';

export const messagesCollection = db.collection<Message>('messages');

export async function getMessage(id: string) {
  return messagesCollection.findOne({ id });
}

export async function createMessage(
  threadId: string,
  userId: string,
  data: CreateMessageBody
) {
  const id = genid();
  await messagesCollection.insertOne({
    ...data,
    ...getDateMetadata(),
    id,
    createdBy: userId,
    threadId,
  });

  return { id };
}

export async function updateMessage(id: string, data: EditMessageBody) {
  const $set = removeEmpty({ ...data, lastUpdated: new Date() });
  await messagesCollection.updateOne({ id }, { $set });
}

export async function deleteMessage(id: string) {
  await messagesCollection.findOneAndDelete({ id });
}

export async function getMessagesByThread(
  threadId: string,
  { skip = 0, limit = 0 }: Pagination
): Promise<PagedResponse<Message>> {
  const totalCount = await messagesCollection.countDocuments({ threadId });
  const items = await messagesCollection
    .find({ threadId })
    .skip(skip)
    .limit(limit)
    .toArray();

  return {
    totalCount,
    items,
  };
}

export async function deleteMessagesInThread(threadId: string) {
  await messagesCollection.deleteMany({ threadId });
}
