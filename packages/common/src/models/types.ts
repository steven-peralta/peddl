import { Gender, Genre, Location, Talent } from './enums';

export type User = {
  _id: string;
  email: string;
  password: string;
  salt: string;
};

export type CreateUserFormData = Omit<User, '_id' | 'salt'>;

export type LoginResponse = { token: string };

export type LoginFormData = CreateUserFormData;

export type CreateUserResponse = Omit<User, 'password' | 'email' | 'salt'>;

export type Profile = {
  _id: string;
  createdBy: string;
  createdAt: Date;
  name: string;
  birthday: Date;
  location: Location;
  gender: Gender;
  genres?: Genre[];
  talents?: Talent[];
  bio?: string;
  spotifyLink?: string;
  soundcloudLink?: string;
  bandcampLink?: string;
};

export type CreateProfileFormData = Omit<
  Profile,
  '_id' | 'createdBy' | 'createdAt'
>;

export type Settings = {
  _id: string;
  createdBy: string;
  ageRange: [number, number];
  genders: Gender[];
  genres: Genre[];
  talents: Talent[];
  locations: Location[];
};

export type CreateSettingsFormData = Omit<Settings, '_id' | 'createdBy'>;

export type CreateSettingsResponse = { _id: string };

export type WithoutID<T> = Omit<T, '_id'>;
