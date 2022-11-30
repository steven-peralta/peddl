import { nanoid } from 'nanoid';
import {
  Gender,
  Genre,
  HTTPStatus,
  Location,
  Pagination,
  PaginationQueryParams,
  SearchPreferences,
  SearchPreferencesQueryParams,
  Talent,
  ValidationFailure,
  ValidationResult,
} from '@peddl/common';
import { Request } from 'express';
import APIError from './error/APIError';

export const genid = (length = 8) => nanoid(length);

export const parseSearchPreferencesParams = (
  req: Request
): SearchPreferences => {
  const { ageRange, genders, genres, talents, locations } =
    req.query as SearchPreferencesQueryParams;
  return {
    ageRange:
      ageRange?.length === 2
        ? (ageRange.split(',').map((t) => parseInt(t, 10)) as [number, number])
        : undefined,
    genders: genders?.split(',') as (keyof typeof Gender)[],
    genres: genres?.split(',') as (keyof typeof Genre)[],
    talents: talents?.split(',') as (keyof typeof Talent)[],
    locations: locations?.split(',') as (keyof typeof Location)[],
  };
};

export const parsePaginationParams = (req: Request): Pagination => {
  const { skip, limit } = req.query as PaginationQueryParams;
  return {
    skip: skip ? parseInt(skip, 10) : undefined,
    limit: limit ? parseInt(limit, 10) : undefined,
  };
};

export function throw400OnBadValidation(
  validationResults: Record<string, ValidationResult | undefined>
) {
  const validationFailures = Object.values(validationResults).filter(
    (result): result is ValidationFailure => !result?.isValid
  );

  if (validationFailures.length > 0) {
    const description = validationFailures
      .map((result) => (result as { reason: string }).reason)
      .join('\n');
    throw new APIError(HTTPStatus.BAD_REQUEST, description);
  }
}

export function removeEmpty<T extends Record<string, unknown>>(obj: T) {
  return Object.entries(obj)
    .filter(([_, v]) => v !== undefined)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}
