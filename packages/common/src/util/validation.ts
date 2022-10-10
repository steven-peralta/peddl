import { Location } from '../api';

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
