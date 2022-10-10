import React, { useEffect, useState } from 'react';
import { ValidationResult, ValidatorFunc } from '@peddl/common';

export const handleFormChange = <Element extends { value: string }>(
  onChangeHandler: (value: string) => void
) => {
  return (event: React.ChangeEvent<Element>) => {
    onChangeHandler(event.target.value);
  };
};

export const handleValidation = <T = string>(
  validator: ValidatorFunc<T>,
  validationTextSetter: React.Dispatch<string | undefined>
) => {
  return (value?: T) => {
    const result = validator(value);
    if (!result.success) {
      validationTextSetter(result.reason);
    } else {
      validationTextSetter(undefined);
    }
  };
};

export function useValidation<T = string>(
  validator: (value: T | undefined) => ValidationResult
) {
  const [value, setValue] = useState<T | undefined>();
  const [validationText, setValidationText] = useState<string | undefined>();

  useEffect(() => {
    const result = validator(value);
    if (!result.success) {
      setValidationText(result.reason);
    } else {
      setValidationText(undefined);
    }
  }, [validator, value]);

  return {
    value: [value],
    setter: [setValue],
    validationText: [validationText],
  };
}
