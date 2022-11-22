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
  ValidationResult,
  ValidatorFunc,
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
    genders: genders?.split(',') as Gender[],
    genres: genres?.split(',') as Genre[],
    talents: talents?.split(',') as Talent[],
    locations: locations?.split(',') as Location[],
  };
};

export const parsePaginationParams = (req: Request): Pagination => {
  const { skip, limit } = req.query as PaginationQueryParams;
  return {
    skip: skip ? parseInt(skip, 10) : undefined,
    limit: limit ? parseInt(limit, 10) : undefined,
  };
};

export function throw400OnBadValidation(validationResults: ValidationResult[]) {
  if (validationResults.length > 0) {
    const description = validationResults
      .filter((result) => !result.isValid)
      .map((result) => (result as { reason: string }).reason)
      .join('\n');
    throw new APIError(HTTPStatus.BAD_REQUEST, description);
  }
}

export function validatePostForm<T extends Record<string, unknown>>(
  model: T,
  validators: { [K in keyof T]: ValidatorFunc<T[K]> }
): ValidationResult[] {
  const results = Object.entries(validators).map(([key, validator]) => {
    return validator(model[key]);
  });
  return results.filter((result) => !result.isValid);
}

export function validatePutForm<T extends Record<string, unknown>>(
  model: T,
  validators: { [K in keyof T]: ValidatorFunc<T[K]> }
) {
  const results = Object.entries(model).map(([key, value]) => {
    const validator = validators[key];
    if (validator) {
      return validator(value as T[string]);
    }
    return undefined;
  });
  return results.filter(
    (result) => typeof result !== 'undefined' && !result.isValid
  ) as ValidationResult[];
}

export function removeEmpty<T extends Record<string, unknown>>(obj: T) {
  return Object.entries(obj)
    .filter(([_, v]) => v !== undefined)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}
