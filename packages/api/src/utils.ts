import { nanoid } from 'nanoid';
import {
  Gender,
  Genre,
  GetProfilesRequest,
  Location,
  Talent,
  ValidatorFunc,
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
export default function validateForm<T extends Record<string, unknown>>(
  model: T,
  validators: Record<keyof T, ValidatorFunc<never>>
) {
  const results = Object.entries(model).map(([key, value]) => {
    const validator = validators[key] as ValidatorFunc<typeof value>;
    return validator(value);
  });
  return results.filter((result) => !result.isValid);
}
