import { Gender, Genre, Location, Talent } from './enums';

export type Model = {
  id: string;
  createdAt: Date;
};

export interface User extends Model {
  email: string;
  password: string;
  salt: string;
}

export interface Profile extends Model {
  createdBy: string;
  name: string;
  birthday: Date;
  location: Location;
  gender: Gender;
  genres?: Genre[];
  talents?: Talent[];
  bio?: string;
  spotifyLink?: string;
  soundcloudUsername?: string;
  bandcampUsername?: string;
}

export interface Settings extends Model {
  createdBy: string;
  ageRange?: [number, number];
  genders?: Gender[];
  genres?: Genre[];
  talents?: Talent[];
  locations?: Location[];
}

export interface Media extends Model {
  createdBy: string;
  filePath: string;
}

export interface Like extends Model {
  userId: string;
  likedBy: string;
}
