import {
  GetProfilesRequest,
  PagedResponse,
  PostProfileRequest,
  PostProfileResponse,
  Profile,
} from '@peddl/common';
import { Collection, Filter } from 'mongodb';
import { genid } from '../utils';

export async function createProfile(
  userId: string,
  profile: PostProfileRequest,
  collection: Collection<Profile>
): Promise<PostProfileResponse> {
  const existingProfile = await collection.findOne({ createdBy: userId });

  if (existingProfile) {
    throw new Error('Profile already exists for that user.');
  }

  const id = genid();
  await collection.insertOne({
    id,
    createdBy: userId,
    createdAt: new Date(),
    ...profile,
    birthday: new Date(profile.birthday),
  });

  return { id };
}

export async function getProfiles(
  settings: GetProfilesRequest,
  collection: Collection<Profile>
): Promise<PagedResponse<Profile>> {
  const { genders = [], genres = [], talents = [], locations = [] } = settings;
  const genderFilter: Filter<Profile> | undefined =
    genders.length > 0
      ? {
          gender: { $in: genders },
        }
      : undefined;

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
  };
  const items = await collection.find(filter).toArray();

  return {
    items,
    count: items.length,
  };
}
