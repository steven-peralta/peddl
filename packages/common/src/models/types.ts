import { Gender, Genre, Location, Talent } from './enums';

export type ID = string;

interface Identifiable {
  id: ID;
}
export type OmitID<T> = Omit<T, 'id'>;

interface UserAssociated {
  createdBy: ID;
}
export type OmitUserAssociated<T> = Omit<T, 'createdBy'>;

interface ThreadAssociated {
  threadId: ID;
}
export type OmitThreadAssociated<T> = Omit<T, 'threadId'>;

interface Dated {
  createdAt: Date;
  lastUpdated: Date;
}
export type OmitDated<T> = Omit<T, 'createdAt' | 'lastUpdated'>;

export type OmitMetadata<T> = OmitID<OmitUserAssociated<OmitDated<T>>>;

export interface SearchPreferences {
  ageRange?: [number, number];
  genders?: (keyof typeof Gender)[];
  genres?: (keyof typeof Genre)[];
  talents?: (keyof typeof Talent)[];
  locations?: (keyof typeof Location)[];
}

export interface User extends Identifiable, Dated {
  email: string;
  password: string;
  searchPreferences: SearchPreferences;
  salt: string;
}

export interface Profile extends UserAssociated, Dated {
  name: string;
  birthday: Date;
  location: keyof typeof Location;
  gender: keyof typeof Gender;
  genres?: (keyof typeof Genre)[];
  talents?: (keyof typeof Talent)[];
  bio?: string;
  spotifyLink?: string;
  soundcloudUsername?: string;
  bandcampUsername?: string;
}

export interface Media extends Identifiable, UserAssociated, Dated {
  filePath: string;
}

export interface Like extends UserAssociated, Dated {
  userId: string;
  mutual: boolean;
}

export interface Thread extends Identifiable, Dated {
  users: ID[];
}

export interface Message
  extends Identifiable,
    ThreadAssociated,
    UserAssociated,
    Dated {
  content: string;
}
