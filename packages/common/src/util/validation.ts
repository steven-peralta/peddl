import {
  Gender,
  Genders,
  Genre,
  Genres,
  Location,
  Locations,
  Talent,
  Talents,
} from '../api';

const bioMaxLength = 240;

export type ValidationResult = {
  success?: true;
  reason?: string;
};

export type ValidatorFunc<T = string> = (
  value: T | undefined
) => ValidationResult;

export const validateEmail: ValidatorFunc = (email): ValidationResult => {
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return {
      reason: 'Your email is invalid',
    };
  }
  return {
    success: true,
  };
};

export const validatePassword: ValidatorFunc = (password): ValidationResult => {
  if (!password || password === '') {
    return { reason: 'Your password is empty.' };
  }
  if (
    !String(password)
      .toLowerCase()
      .match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        // one num one special char and at least 6 char
      )
  ) {
    return {
      reason:
        'Your password needs to be at least 6 characters long and have at least 1 number and 1 special character.',
    };
  }
  return {
    success: true,
  };
};

export const validateConfirmPassword = (
  password: string | undefined,
  confirmPassword: string | undefined
): ValidationResult => {
  if (password !== confirmPassword) {
    return {
      reason: 'Your passwords do not match',
    };
  }
  return {
    success: true,
  };
};

export const validateBirthday: ValidatorFunc<Date> = (
  date
): ValidationResult => {
  if (date) {
    const minDate = new Date();
    minDate.setFullYear(new Date().getFullYear() - 18);
    const maxDate = new Date();
    maxDate.setFullYear(new Date().getFullYear() + 120);
    if (date > minDate) {
      return { reason: 'You need to be at least 18 to use Peddl.' };
    }
    if (date >= maxDate) {
      return { reason: "You're too old." };
    }
  } else {
    return { reason: 'Please specify a date.' };
  }

  return { success: true };
};

export const validateName: ValidatorFunc = (name): ValidationResult => {
  if (
    !String(name)
      .toLowerCase()
      .match(/[a-zA-Z]*$/)
  ) {
    return {
      reason: 'Please enter a valid name.',
    };
  }
  return {
    success: true,
  };
};

export const validateLocation: ValidatorFunc<Location> = (
  location
): ValidationResult => {
  if (!location) {
    return { reason: 'You need to specify a location.' };
  }
  if (!Locations.includes(location)) {
    return {
      reason: `${location} is not a valid location`,
    };
  }
  return {
    success: true,
  };
};

export const validateGender: ValidatorFunc<Gender> = (
  gender
): ValidationResult => {
  if (gender) {
    if (!Genders.includes(gender)) {
      return { reason: 'Invalid gender' };
    }
  }
  return { success: true };
};

export const validateGenres: ValidatorFunc<Genre[]> = (
  genres
): ValidationResult => {
  if (genres) {
    if (genres.some((genre) => !Genres.includes(genre))) {
      return { reason: 'Invalid genre' };
    }
  }
  return { success: true };
};

export const validateTalents: ValidatorFunc<Talent[]> = (
  talents
): ValidationResult => {
  if (talents) {
    if (talents.some((talent) => !Talents.includes(talent))) {
      return { reason: 'Invalid talent' };
    }
  }
  return { success: true };
};

export const validateBio: ValidatorFunc = (bio) => {
  if (bio) {
    if (bio.length > bioMaxLength) {
      return { reason: 'Your bio is too long' };
    }
  }
  return { success: true };
};
