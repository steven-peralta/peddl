import { ValidationResult } from '@peddl/common';
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
