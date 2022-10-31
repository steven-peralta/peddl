import { nanoid } from 'nanoid';
import {
  Gender,
  Genre,
  GetProfilesRequest,
  Location,
  Talent,
} from '@peddl/common';

export const genid = (length = 8) => nanoid(length);

export type SettingsQueryParams = {
  genders?: string;
  genres?: string;
  talents?: string;
  locations?: string;
};

export const parseSettingsParams = ({
  genders,
  genres,
  talents,
  locations,
}: SettingsQueryParams): GetProfilesRequest => {
  return {
    genders: genders ? (genders.split(',') as Gender[]) : undefined,
    genres: genres ? (genres.split(',') as Genre[]) : undefined,
    talents: talents ? (talents.split(',') as Talent[]) : undefined,
    locations: locations ? (locations.split(',') as Location[]) : undefined,
  };
};
