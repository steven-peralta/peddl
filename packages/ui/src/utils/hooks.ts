import { LoginFormData, ValidationResult } from '@peddl/common';
import { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';

export function useAuth() {
  const [isAuthed, setAuthed] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  const loginCallback = async (loginForm: LoginFormData) => {
    const res = await axiosInstance.post('/auth', loginForm);
    if (res.status === 200 && res.data) {
      setToken(res.data.token);
      setAuthed(true);
      return res.data.token;
    }
    return undefined;
  };

  const logoutCallback = async () => {
    setToken(undefined);
    setAuthed(false);
  };

  return {
    isAuthed: [isAuthed],
    token: [token],
    login: [loginCallback],
    logout: [logoutCallback],
  };
}

export function useValidation<T>(
  validator: (value: T) => ValidationResult,
  defaultValue: T,
  required = false
) {
  const [value, setValue] = useState<T>(defaultValue);
  const [validationText, setValidationText] = useState<string | undefined>();
  const [isValid, setIsValid] = useState(!(required && !value));
  const [initialChange, setInitialChange] = useState(false);

  useEffect(() => {
    if (initialChange) {
      const { reason, isValid: isValueValid } = validator(value);
      if (reason) {
        setValidationText(reason);
      } else {
        setValidationText(undefined);
      }
      setIsValid(isValueValid);
    }
  }, [initialChange, validator, value]);

  return {
    value: [value],
    setter: [
      (v: T) => {
        if (!initialChange) {
          setInitialChange(true);
        }
        setValue(v);
      },
    ],
    validationText: [validationText],
    isValid: [isValid],
  };
}
