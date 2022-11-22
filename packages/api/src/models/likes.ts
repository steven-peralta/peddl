import { HTTPStatus, Like, Pagination } from '@peddl/common';
import { WithId } from 'mongodb';
import { db } from '../db';
import APIError from '../error/APIError';
import getDateMetadata from './utils';

export const likesCollection = db.collection<Like>('likes');

export async function throw409IfLikeFound(userId: string, createdBy: string) {
  const likeExists = await likesCollection.countDocuments({
    userId,
    createdBy,
  });

  if (likeExists) {
    throw new APIError(
      HTTPStatus.CONFLICT,
      'A like already exists for that user.'
    );
  }
}

export async function createLike(userId: string, createdBy: string) {
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
    userId,
    createdBy,
    mutual,
    ...getDateMetadata(),
  });
}

export async function deleteLike(userId: string, createdBy: string) {
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

export async function getLikes(
  createdBy: string,
  { skip = 0, limit = 0 }: Pagination,
  mutual = false
) {
  let totalCount: number;
  let items: WithId<Like>[];
  if (mutual) {
    totalCount = await likesCollection.countDocuments({ createdBy, mutual });
    items = await likesCollection
      .find({ createdBy, mutual })
      .skip(skip)
      .limit(limit)
      .toArray();
  } else {
    totalCount = await likesCollection.countDocuments({ createdBy });
    items = await likesCollection
      .find({ createdBy })
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  return {
    items,
    totalCount,
  };
}

export async function areUsersMutuals(userIds: string[]) {
  const results = (
    await Promise.all(
      userIds.map(async (id1) => {
        return Promise.all(
          userIds.map(async (id2) => {
            if (id1 === id2) return null;
            let mutual: boolean;
            const like = await likesCollection.findOne({
              createdBy: id1,
              userId: id2,
            });

            if (like) {
              mutual = like.mutual;
            } else {
              mutual = false;
            }

            return mutual;
          })
        );
      })
    )
  ).map((item) => {
    return !item.includes(false);
  });

  return !results.some((item) => !item);
}

export async function throw401IfUsersNotMutual(userIds: string[]) {
  if (!(await areUsersMutuals(userIds))) {
    throw new APIError(
      HTTPStatus.UNAUTHORIZED,
      'Specified users are not mutual with each other.'
    );
  }
}
