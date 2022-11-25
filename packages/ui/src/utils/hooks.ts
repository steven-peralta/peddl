import { isValidationFailure, ValidationResult } from '@peddl/common';
import { useEffect, useState } from 'react';

export default function useValidation<T>(
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
      const result = validator(value);
      if (isValidationFailure(result)) {
        setValidationText(result.reason);
      } else {
        setValidationText(undefined);
      }
      setIsValid(result.isValid);
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
