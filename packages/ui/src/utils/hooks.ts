import { ValidationResult } from '@peddl/common';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ApiRequestFunc } from './api';

export function useRequest<T, R>(
  requestFunc: ApiRequestFunc<T, R>,
  fakeData?: R
) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<R | undefined>();
  const [error, setError] = useState<AxiosError<T, R> | undefined>();
  const [status, setStatus] = useState<number | undefined>();

  const requestCallback = async (data: T) => {
    setIsLoading(true);

    if (fakeData) {
      setResponse(fakeData);
    } else {
      try {
        const request = await requestFunc(data);
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
