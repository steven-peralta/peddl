import { Like } from '@peddl/common';
import { genid } from '../utils';
import { db } from '../db';

export const likesCollection = db.collection<Like>('likes');

export async function createLike(userId: string, createdBy: string) {
  const id = genid();

  const mutualLike = await likesCollection.findOne({
    userId: createdBy,
    createdBy: userId,
  });

  let mutual = false;

  if (mutualLike) {
    mutual = true;
    await likesCollection.updateOne(
      {
        userId: createdBy,
        createdBy: userId,
      },
      {
        $set: {
          mutual: true,
        },
      }
    );
  }

  await likesCollection.insertOne({
    id,
    createdAt: new Date(),
    userId,
    createdBy,
    mutual,
  });

  return { id };
}

export async function removeLike(userId: string, createdBy: string) {
  const mutualLike = await likesCollection.findOne({
    userId: createdBy,
    createdBy: userId,
  });

  await likesCollection.deleteOne({ userId, createdBy });

  if (mutualLike) {
    await likesCollection.updateOne(
      {
        userId: createdBy,
        createdBy: userId,
      },
      {
        $set: {
          mutual: false,
        },
      }
    );
  }
}

export async function getLikes(createdBy: string, mutual = false) {
  if (mutual) {
    return likesCollection.find({ createdBy, mutual }).toArray();
  }
  return likesCollection.find({ createdBy }).toArray();
}
