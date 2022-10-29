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

export type CreateUserResponse = LoginResponse;

export type Profile = {
  _id: string;
  createdBy: string;
  createdAt: Date;
  name: string;
  birthday: Date;
  location: Location;
  gender: Gender;
  genres: Genre[];
  talents: Talent[];
  bio: string;
  spotifyLink: string;
  soundcloudLink: string;
  bandcampLink: string;
};

export type CreateProfileFormData = Omit<
  Profile,
  '_id' | 'createdBy' | 'createdAt'
>;

export type WithoutID<T> = Omit<T, '_id'>;
