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
  const [isValid, setIsValid] = useState<boolean>(!(required && !value));
  const [initialValidation, setInitialValidation] = useState(false);

  const performValidation = () => {
    const { reason, isValid: isValueValid } = validator(value);
    if (reason) {
      setValidationText(reason);
    } else {
      setValidationText(undefined);
    }
    setIsValid(isValueValid);
  };

  useEffect(() => {
    if (initialValidation) {
      performValidation();
    }
  });

  return {
    value: [value],
    setter: [setValue],
    validationText: [validationText],
    isValid: [isValid],
    onBlur: [
      () => {
        if (!initialValidation) {
          performValidation();
        }
        setInitialValidation(true);
      },
    ],
  };
}
