import { Gender, Genre, Location, Talent } from '../models';

const bioMaxLength = 240;
const textInputMaxLength = 1024;

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
const nameRegex = /[a-zA-Z]*$/;
const spotifyLinkRegex = /^https:\/\/open.spotify.com\/artist\/[A-z0-9?=-]+$/g;
const soundcloudLinkRegex = /^([a-z0-9-_])\w+$/g;
const bandcampLinkRegex = /^([a-z0-9-_])\w+$/g;

export type ValidationSuccess = { isValid: true };
export type ValidationFailure = { isValid: false; reason: string };
export type ValidationResult = ValidationSuccess | ValidationFailure;
export type ValidationResults<T> = Partial<Record<keyof T, ValidationResult>>;

export const isValidationFailure = (
  validation: ValidationResult
): validation is ValidationFailure => !validation.isValid;

export const isValidationSuccess = (
  validation: ValidationResult
): validation is ValidationSuccess => validation.isValid;

export type ValidatorFunc<T> = (value: T) => ValidationResult;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const getEntries = <T extends Record<string, unknown>>(obj: T) =>
  Object.entries(obj) as Entries<T>;

export function validateForm<T extends Record<string, unknown>>(
  model: T,
  validators: { [K in keyof T]: ValidatorFunc<T[K]> },
  skipNull = false
): ValidationResults<T> {
  return getEntries(validators).reduce((acc, [key, validator]) => {
    const value = model[key];
    if (!value && skipNull) return acc;

    acc[key] = validator(model[key]);

    return acc;
  }, {} as ValidationResults<T>);
}

const makeValidator = <T>(validator: ValidatorFunc<T>): ValidatorFunc<T> =>
  validator;

export const validateEmail = makeValidator((email?: string) => {
  if (!email) {
    return { isValid: false, reason: 'Your email is required.' };
  }

  if (!email.match(emailRegex)) {
    return {
      isValid: false,
      reason: 'Your email is invalid.',
    };
  }

  if (email.length > textInputMaxLength) {
    return { isValid: false, reason: 'Your email is too long.' };
  }

  return {
    isValid: true,
  };
});

export const validatePassword = makeValidator((password?: string) => {
  if (!password || password === '') {
    return { isValid: false, reason: 'Your password is required.' };
  }

  if (password.length > textInputMaxLength) {
    return { isValid: false, reason: 'Your password is too long.' };
  }

  if (!password.match(passwordRegex)) {
    return {
      isValid: false,
      reason:
        'Your password needs to be at least 6 characters long and have at least 1 number and 1 of the following characters: !@#$%^&*.',
    };
  }

  return {
    isValid: true,
  };
});

export const validateConfirmPassword = (
  password?: string,
  confirmPassword?: string
): ValidationResult => {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      reason: 'Your passwords do not match.',
    };
  }
  return {
    isValid: true,
  };
};

export const validateBirthday = makeValidator((d?: Date | string | null) => {
  if (d) {
    let date: Date;
    if (typeof d === 'string') {
      date = new Date(d);
    } else {
      date = d;
    }
    const minDate = new Date();
    minDate.setFullYear(new Date().getFullYear() - 18);
    const maxDate = new Date();
    maxDate.setFullYear(new Date().getFullYear() + 120);
    if (date > minDate) {
      return {
        isValid: false,
        reason: 'You need to be at least 18 to use Peddl.',
      };
    }
    if (date >= maxDate) {
      return { isValid: false, reason: "You're too old." };
    }
  } else {
    return { isValid: false, reason: 'Your birthday is required.' };
  }

  return { isValid: true };
});

export const validateName = makeValidator((name?: string) => {
  if (!name) {
    return { isValid: false, reason: 'Your name is required.' };
  }

  if (!name.match(nameRegex)) {
    return {
      isValid: false,
      reason: 'Your name is invalid.',
    };
  }

  if (name.length > textInputMaxLength) {
    return { isValid: false, reason: 'Your name is too long.' };
  }

  return {
    isValid: true,
  };
});

export const validateLocation = makeValidator((location?: string) => {
  if (!location) {
    return { isValid: false, reason: 'Your location is required.' };
  }

  if (!Object.keys(Location).includes(location)) {
    return {
      isValid: false,
      reason: `${location} is not a valid location.`,
    };
  }

  return {
    isValid: true,
  };
});

export const validateLocations = makeValidator((locations?: string[]) => {
  if (locations) {
    if (
      locations.some((location) => !Object.keys(Location).includes(location))
    ) {
      return {
        isValid: false,
        reason: 'One of the specified locations is invalid.',
      };
    }
  }

  return { isValid: true };
});

export const validateGender = makeValidator((gender?: string) => {
  if (gender) {
    if (!Object.keys(Gender).includes(gender)) {
      return { isValid: false, reason: `${gender} is not a valid gender.` };
    }
  }

  return { isValid: true };
});

export const validateGenders = makeValidator((genders?: string[]) => {
  if (genders) {
    if (genders.some((gender) => !Object.keys(Gender).includes(gender))) {
      return {
        isValid: false,
        reason: 'One of the specified genders is invalid.',
      };
    }
  }

  return { isValid: true };
});

export const validateGenres = makeValidator((genres?: string[]) => {
  if (genres) {
    if (genres.some((genre) => !Object.keys(Genre).includes(genre))) {
      return {
        isValid: false,
        reason: `One of the specified genres is invalid.`,
      };
    }
  }

  return { isValid: true };
});

export const validateTalents = makeValidator((talents?: string[]) => {
  if (talents) {
    if (talents.some((talent) => !Object.keys(Talent).includes(talent))) {
      return {
        isValid: false,
        reason: 'One of the specified talents is invalid.',
      };
    }
  }

  return { isValid: true };
});

export const validateBio = makeValidator((bio?: string) => {
  if (bio) {
    if (bio.length > bioMaxLength) {
      return { isValid: false, reason: 'Your bio is too long.' };
    }
  }

  return { isValid: true };
});

export const validateSpotifyLink = makeValidator((link?: string) => {
  if (link) {
    if (!link.match(spotifyLinkRegex)) {
      return { isValid: false, reason: 'Your Spotify artist link is invalid.' };
    }
  }

  return { isValid: true };
});

export const validateSoundcloudUsername = makeValidator((link?: string) => {
  if (link) {
    if (!link.match(soundcloudLinkRegex)) {
      return {
        isValid: false,
        reason: 'Your Soundcloud username link is invalid.',
      };
    }
  }
  return { isValid: true };
});

export const validateBandcampUsername = makeValidator((link?: string) => {
  if (link) {
    if (!link.match(bandcampLinkRegex)) {
      return {
        isValid: false,
        reason: 'Your Bandcamp username link is invalid.',
      };
    }
  }

  return { isValid: true };
});

export const validateAgeRange = makeValidator((ageRange?: number[]) => {
  if (ageRange) {
    if (ageRange.length !== 2) {
      return {
        isValid: false,
        reason: 'Age range must consist of exactly two numbers',
      };
    }

    if (ageRange.some((age) => age > 100 || age < 0)) {
      return {
        isValid: false,
        reason: 'Ages cannot be over 100 or less than 0',
      };
    }
  }

  return { isValid: true };
});
