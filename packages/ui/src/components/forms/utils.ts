import React, { useState, useEffect } from 'react';
import { ValidationResult } from '@peddl/common';

export const handleFormChange = <Element extends { value: string }>(
  onChangeHandler: (value: string) => void
) => {
  return (event: React.ChangeEvent<Element>) => {
    onChangeHandler(event.target.value);
  };
};

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
