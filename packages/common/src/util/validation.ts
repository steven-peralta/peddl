import {
  Gender,
  Genders,
  Genre,
  Genres,
  Location,
  Locations,
  Talent,
  Talents,
} from '../models';

const bioMaxLength = 240;
const textInputMaxLength = 1024;

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
const nameRegex = /[a-zA-Z]*$/;
const spotifyLinkRegex = /^https:\/\/open.spotify.com\/artist\/[A-z0-9?=-]+$/g;
const soundcloudLinkRegex = /^([a-z0-9-_])\w+$/g;
const bandcampLinkRegex = /^([a-z0-9-_])\w+$/g;

export type ValidationResult = {
  isValid: boolean;
  reason?: string;
};

export type ValidatorFunc<T = string> = (
  value: T | undefined
) => ValidationResult;

export const validateEmail: ValidatorFunc = (email): ValidationResult => {
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
};

export const validatePassword: ValidatorFunc = (password): ValidationResult => {
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
};

export const validateConfirmPassword = (
  password: string | undefined,
  confirmPassword: string | undefined
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

export const validateBirthday: ValidatorFunc<Date | null> = (
  date
): ValidationResult => {
  if (date) {
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
};

export const validateName: ValidatorFunc = (name): ValidationResult => {
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
};

export const validateLocation: ValidatorFunc = (location): ValidationResult => {
  if (!location) {
    return { isValid: false, reason: 'Your location is required.' };
  }

  if (!Locations.includes(location as Location)) {
    return {
      isValid: false,
      reason: `${location} is not a valid location.`,
    };
  }

  return {
    isValid: true,
  };
};

export const validateGender: ValidatorFunc = (gender): ValidationResult => {
  if (gender) {
    if (!Genders.includes(gender as Gender)) {
      return { isValid: false, reason: `${gender} is not a valid gender.` };
    }
  }

  return { isValid: true };
};

export const validateGenres: ValidatorFunc<string[]> = (
  genres
): ValidationResult => {
  if (genres) {
    if (genres.some((genre) => !Genres.includes(genre as Genre))) {
      return {
        isValid: false,
        reason: `One of the specified genres is invalid.`,
      };
    }
  }

  return { isValid: true };
};

export const validateTalents: ValidatorFunc<string[]> = (
  talents
): ValidationResult => {
  if (talents) {
    if (talents.some((talent) => !Talents.includes(talent as Talent))) {
      return {
        isValid: false,
        reason: 'One of the specified talents is invalid.',
      };
    }
  }

  return { isValid: true };
};

export const validateBio: ValidatorFunc = (bio) => {
  if (bio) {
    if (bio.length > bioMaxLength) {
      return { isValid: false, reason: 'Your bio is too long.' };
    }
  }

  return { isValid: true };
};

export const validateSpotifyLink: ValidatorFunc = (link) => {
  if (link) {
    if (!link.match(spotifyLinkRegex)) {
      return { isValid: false, reason: 'Your Spotify artist link is invalid.' };
    }
  }

  return { isValid: true };
};

export const validateSoundcloudLink: ValidatorFunc = (link) => {
  if (link) {
    if (!link.match(soundcloudLinkRegex)) {
      return {
        isValid: false,
        reason: 'Your Soundcloud username link is invalid.',
      };
    }
  }
  return { isValid: true };
};

export const validateBandcampLink: ValidatorFunc = (link) => {
  if (link) {
    if (!link.match(bandcampLinkRegex)) {
      return {
        isValid: false,
        reason: 'Your Bandcamp username link is invalid.',
      };
    }
  }

  return { isValid: true };
};
