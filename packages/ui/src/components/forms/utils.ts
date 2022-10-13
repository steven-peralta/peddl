import React, { useState } from 'react';
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
  defaultValue: T
) {
  const [value, setValue] = useState<T>(defaultValue);
  const [validationText, setValidationText] = useState<string | undefined>();

  return {
    value: [value],
    setter: [setValue],
    validationText: [validationText],
    onBlur: [
      () => {
        const result = validator(value);
        if (!result.success) {
          setValidationText(result.reason);
        } else {
          setValidationText(undefined);
        }
      },
    ],
  };
}
