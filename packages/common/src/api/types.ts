import { ID } from '../models';

export type PagedResponse<T> = {
  items: T[];
  totalCount: number;
};

export type Pagination = {
  skip?: number;
  limit?: number;
};

export type PaginationQueryParams = {
  skip?: string;
  limit?: string;
};

export type LoginBody = { email: string; password: string };

export type SearchPreferencesFormData = {
  ageRange?: [number, number];
  genders?: string[];
  genres?: string[];
  talents?: string[];
  locations?: string[];
};

export type CreateUserBody = {
  email: string;
  password: string;
  searchPreferences: SearchPreferencesFormData;
  profile: CreateProfileBody;
};
export type EditUserBody = Partial<Omit<CreateUserBody, 'profile'>>;

export type CreateProfileBody = {
  name: string;
  birthday: string;
  location: string;
  gender: string;
  genres?: string[];
  talents?: string[];
  bio?: string;
  spotifyLink?: string;
  soundcloudUsername?: string;
  bandcampUsername?: string;
};
export type EditProfileBody = Partial<CreateProfileBody>;

export type Token = { token: string; userId: string };
export type ErrorResponse = { error: string };

export type IDResponse = { id: string };

export type SearchPreferencesQueryParams = {
  ageRange?: string;
  genders?: string;
  genres?: string;
  talents?: string;
  locations?: string;
};

export type CreateThreadBody = { users: ID[] };
export type EditThreadBody = Partial<CreateThreadBody>;
export type CreateMessageBody = { content: string };
export type EditMessageBody = Partial<CreateMessageBody>;
