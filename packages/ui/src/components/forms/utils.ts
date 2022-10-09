import React from 'react';
import { ValidationResult } from '@peddl/common';

export const handleFormChange = <Element extends { value: string }>(
  onChangeHandler: (value: string) => void
) => {
  return (event: React.ChangeEvent<Element>) => {
    onChangeHandler(event.target.value);
  };
};

export const handleValidation = (
  setter: React.Dispatch<string>,
  validator: (value: string) => ValidationResult,
  validationTextSetter: React.Dispatch<string | undefined>
) => {
  return (value: string) => {
    setter(value);
    const result = validator(value);
    if (!result.success) {
      validationTextSetter(result.reason);
    } else {
      validationTextSetter(undefined);
    }
  };
};
