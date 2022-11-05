import { Collection } from 'mongodb';
import { Like } from '@peddl/common';
import { genid } from '../utils';

export async function createLike(
  userId: string,
  likedBy: string,
  collection: Collection<Like>
) {
  const id = genid();

  await collection.insertOne({
    id,
    createdAt: new Date(),
    userId,
    likedBy,
  });

  return { id };
}

export async function removeLike(userId: string, collection: Collection<Like>) {
  await collection.findOneAndDelete({ userId });
}
