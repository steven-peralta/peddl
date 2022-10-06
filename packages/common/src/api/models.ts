import { Gender, Genre, Location, Talent } from './enums';

export type UserLogin = {
  username: string;
  password: string;
};

export type Links = {
  spotify: string;
  soundcloud: string;
  bandcamp: string;
};

export type User = {
  name: string;
  birthday: Date;
  location: Location;
  gender: Gender;
  genres: Genre[];
  talents: Talent[];
  bio: string;
  links: Links;
};
