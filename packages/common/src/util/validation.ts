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
const textInputMaxLength = 1024;

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const nameRegex = /[a-zA-Z]*$/;
const spotifyLinkRegex = /^https:\/\/open.spotify.com\/artist\/[A-z0-9?=-]+$/g;

export type ValidationResult = {
  success?: true;
  reason?: string;
};

export type ValidatorFunc<T = string> = (
  value: T | undefined
) => ValidationResult;

export const validateEmail: ValidatorFunc = (email): ValidationResult => {
  if (!email) {
    return { reason: 'Email is required.' };
  }

  if (!email.match(emailRegex)) {
    return {
      reason: 'Your email is invalid',
    };
  }

  if (email.length > textInputMaxLength) {
    return { reason: 'Your email is too long.' };
  }

  return {
    success: true,
  };
};

export const validatePassword: ValidatorFunc = (password): ValidationResult => {
  if (!password || password === '') {
    return { reason: 'Your password is empty.' };
  }

  if (password.length > textInputMaxLength) {
    return { reason: 'Your password is too long.' };
  }

  if (!password.match(passwordRegex)) {
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
  if (!name) {
    return { reason: 'Please specify a name' };
  }

  if (!name.match(nameRegex)) {
    return {
      reason: 'Please enter a valid name.',
    };
  }

  if (name.length > textInputMaxLength) {
    return { reason: 'Your name is too long.' };
  }

  return {
    success: true,
  };
};

export const validateLocation: ValidatorFunc = (location): ValidationResult => {
  if (!location) {
    return { reason: 'You need to specify a location.' };
  }

  if (!Locations.includes(location as Location)) {
    return {
      reason: `${location} is not a valid location`,
    };
  }

  return {
    success: true,
  };
};

export const validateGender: ValidatorFunc = (gender): ValidationResult => {
  if (gender) {
    if (!Genders.includes(gender as Gender)) {
      return { reason: 'Invalid gender' };
    }
  }

  return { success: true };
};

export const validateGenres: ValidatorFunc<
  {
    value: string;
    label: string;
  }[]
> = (genres): ValidationResult => {
  if (genres) {
    if (genres.some((genre) => !Genres.includes(genre.label as Genre))) {
      return { reason: 'Invalid genre' };
    }
  }

  return { success: true };
};

export const validateTalents: ValidatorFunc<
  {
    value: string;
    label: string;
  }[]
> = (talents): ValidationResult => {
  if (talents) {
    if (talents.some((talent) => !Talents.includes(talent.label as Talent))) {
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

export const validateSpotifyLink: ValidatorFunc = (link) => {
  if (link) {
    if (!link.match(spotifyLinkRegex)) {
      return { reason: 'Your spotify artist link is invalid.' };
    }
  }

  return { success: true };
};
