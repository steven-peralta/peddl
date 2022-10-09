import { Location } from '../api/enums';

export type ValidationResult = {
  status: boolean;
  reason?: string;
};

export const validateEmail = (email: string): ValidationResult => {
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return {
      status: false,
      reason: 'Your email is invalid',
    };
  }
  return {
    status: true,
  };
};

export const validatePassword = (password: string): ValidationResult => {
  if (
    !String(password)
      .toLowerCase()
      .match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        // one num one special char and at least 6 char
      )
  ) {
    return {
      status: false,
      reason: 'Your password is invalid',
    };
  }
  return {
    status: true,
  };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (password !== confirmPassword) {
    return {
      status: false,
      reason: 'Your password does not match',
    };
  }
  return {
    status: true,
  };
};

export const validateName = (name: string): ValidationResult => {
  if (
    !String(name)
      .toLowerCase()
      .match(/[a-zA-Z]*$/)
  ) {
    return {
      status: false,
      reason: 'Please enter a valid name',
    };
  }
  return {
    status: true,
  };
};

export const validateLocation = (location: string): ValidationResult => {
  if (!Object.values(Location).includes(location as Location)) {
    return {
      status: false,
      reason: 'Invalid Location',
    };
  }
  return {
    status: true,
  };
};
