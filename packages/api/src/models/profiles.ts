import {
  HTTPStatus,
  PagedResponse,
  Pagination,
  Profile,
  SearchPreferences,
  Location,
  Gender,
  Genre,
  Talent,
  CreateProfileBody,
  EditProfileBody,
} from '@peddl/common';
import { Filter, Document } from 'mongodb';
import { db } from '../db';
import APIError from '../error/APIError';
import getDateMetadata from './utils';
import { removeEmpty } from '../utils';

export const profilesCollection = db.collection<Profile>('profiles');

export async function throw404IfProfileNotFound(userId: string) {
  const profileExists = await profilesCollection.countDocuments({
    createdBy: userId,
  });

  if (!profileExists) {
    throw new APIError(
      HTTPStatus.NOT_FOUND,
      "Profile doesn't exist for that user."
    );
  }
}

export async function getProfile(userId: string): Promise<Profile | null> {
  return profilesCollection.findOne({ createdBy: userId });
}

export async function createProfile(
  userId: string,
  profileFormData: CreateProfileBody
) {
  const {
    name,
    birthday,
    location,
    gender,
    genres,
    talents,
    bio,
    spotifyLink,
    soundcloudUsername,
    bandcampUsername,
  } = profileFormData;

  await profilesCollection.insertOne({
    name,
    birthday: new Date(birthday),
    location: location as keyof typeof Location,
    gender: gender as keyof typeof Gender,
    genres: genres as (keyof typeof Genre)[],
    talents: talents as (keyof typeof Talent)[],
    bio,
    spotifyLink,
    soundcloudUsername,
    bandcampUsername,
    createdBy: userId,
    ...getDateMetadata(),
  });
}

export async function updateProfile(
  userId: string,
  profileFormData: EditProfileBody
) {
  const {
    name,
    birthday,
    location,
    gender,
    genres,
    talents,
    bio,
    spotifyLink,
    soundcloudUsername,
    bandcampUsername,
  } = profileFormData;

  const $set = removeEmpty({
    name,
    birthday: birthday ? new Date(birthday) : undefined,
    location: location as Location,
    gender: gender as Gender,
    genres: genres as Genre[],
    talents: talents as Talent[],
    bio,
    spotifyLink,
    soundcloudUsername,
    bandcampUsername,
    lastUpdated: new Date(),
  });

  await profilesCollection.updateOne(
    { createdBy: userId },
    {
      $set,
    }
  );
}

export async function deleteProfile(userId: string) {
  await profilesCollection.findOneAndDelete({ createdBy: userId });
}

export async function getProfiles(
  searchPreferences: SearchPreferences,
  { skip = 0, limit = 0 }: Pagination,
  userId: string
): Promise<PagedResponse<Document>> {
  const {
    genders = [],
    genres = [],
    talents = [],
    locations = [],
  } = searchPreferences;
  const genderFilter: Filter<Profile> | undefined =
    genders.length > 0 ? { gender: { $in: genders } } : undefined;

  const genresFilter: Filter<Profile> | undefined =
    genres.length > 0 ? { genres: { $in: genres } } : undefined;

  const talentsFilter: Filter<Profile> | undefined =
    talents.length > 0 ? { talents: { $in: talents } } : undefined;

  const locationsFilter: Filter<Profile> | undefined =
    locations.length > 0 ? { location: { $in: locations } } : undefined;

  const filter: Filter<Profile> = {
    ...genderFilter,
    ...genresFilter,
    ...talentsFilter,
    ...locationsFilter,
    createdBy: { $nin: [userId] },
  };
  const totalCount = await profilesCollection.countDocuments(filter);
  const items = await profilesCollection
    .find(filter)
    .skip(skip)
    .limit(limit)
    .project({ createdBy: 1 })
    .toArray();

  return {
    items,
    totalCount,
  };
}
