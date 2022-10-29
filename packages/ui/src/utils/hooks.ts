import { LoginFormData, ValidationResult } from '@peddl/common';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ApiRequestFunc, authenticate } from './api';

export function useAuth() {
  const [isAuthed, setAuthed] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  const loginCallback = async (loginForm: LoginFormData) => {
    const res = await authenticate(loginForm);
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

export function useRequest<T, R>(
  requestFunc: ApiRequestFunc<T, R>,
  fakeData?: R
) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<R | undefined>();
  const [error, setError] = useState<AxiosError<T, R> | undefined>();
  const [status, setStatus] = useState<number | undefined>();

  const requestCallback = async (data: T, token?: string) => {
    setIsLoading(true);

    if (fakeData) {
      setResponse(fakeData);
    } else {
      try {
        const request = await requestFunc(data, token);
        setResponse(request.data);
        setStatus(request.status);
      } catch (e) {
        if (axios.isAxiosError<T, R>(e)) {
          setError(e);
          setStatus(e.status);
        }
      }
    }

    setIsLoading(false);
  };

  return {
    isLoading: [isLoading],
    requestFunc: [requestCallback],
    responseData: [response],
    error: [error],
    status: [status],
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
