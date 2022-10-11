import { Gender, Genre, Location, Talent } from '../api';

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
      reason: 'Please enter a valid name',
    };
  }
  return {
    success: true,
  };
};

export const validateLocation: ValidatorFunc = (location): ValidationResult => {
  if (!Object.values(Location).includes(location as Location)) {
    return {
      reason: 'Invalid Location',
    };
  }
  return {
    success: true,
  };
};

export const validateGender: ValidatorFunc = (gender): ValidationResult => {
  if (!Object.values(Gender).includes(gender as Gender)) {
    return {
      reason: 'Gender not in scope',
    };
  }
  return {
    success: true,
  };
};

export const validateGenres: ValidatorFunc = (genres): ValidationResult => {
  if (!Object.values(Genre).includes(genres as Genre)) {
    return {
      reason: 'Genre not in scope',
    };
  }
  return {
    success: true,
  };
};

export const validateTalents: ValidatorFunc = (talents): ValidationResult => {
  if (!Object.values(Talent).includes(talents as Talent)) {
    return {
      reason: 'Talent not in scope',
    };
  }
  return {
    success: true,
  };
};

export const validateBio: ValidatorFunc = (bio): ValidationResult => {
  if (String(bio).length > 500) {
    return {
      reason: 'Reached max characters: 500 ',
    };
  }
  return {
    success: true,
  };
};

export const validateSpotifyLink: ValidatorFunc = (
  spotifyLink
): ValidationResult => {
  if (
    !String(spotifyLink)
      .toLowerCase()
      .match(
        /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/
      )
  ) {
    return {
      reason: 'Please enter a valid link',
    };
  }
  return {
    success: true,
  };
};

export const validateSoundcloudLink: ValidatorFunc = (
  soundcloudLink
): ValidationResult => {
  if (
    !String(soundcloudLink)
      .toLowerCase()
      .match(
        /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/
      )
  ) {
    return {
      reason: 'Please enter a valid link',
    };
  }
  return {
    success: true,
  };
};

export const validateBandcampLink: ValidatorFunc = (
  bandcampLink
): ValidationResult => {
  if (
    !String(bandcampLink)
      .toLowerCase()
      .match(
        /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/
      )
  ) {
    return {
      reason: 'Please enter a valid link',
    };
  }
  return {
    success: true,
  };
};
