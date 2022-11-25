import React from 'react';
import { ValidationResults, ValidatorFunc } from '@peddl/common';
import { ReactState } from '../../utils/types';

export const handleFormChange = <Element extends { value: string }>(
  onChangeHandler: (value: string) => void
) => {
  return (event: React.ChangeEvent<Element>) => {
    onChangeHandler(event.target.value);
  };
};

export const validateOnBlur = <T extends Record<string, unknown>, R>(
  name: keyof T,
  validator: ValidatorFunc<R>,
  [formData]: ReactState<T>,
  [validationResults, setValidationResults]: ReactState<ValidationResults<T>>,
  [initialValidate, setInitialValidate]: ReactState<
    Partial<Record<keyof T, true>>
  >
) => {
  return () => {
    setValidationResults({
      ...validationResults,
      [name]: validator(formData[name] as R),
    });

    if (!initialValidate[name]) {
      setInitialValidate({ ...initialValidate, [name]: true });
    }
  };
};

export const validateOnChange = <T extends Record<string, unknown>, R>(
  name: keyof T,
  validator: ValidatorFunc<R>,
  [formData, setFormData]: ReactState<T>,
  [validationResults, setValidationResults]: ReactState<ValidationResults<T>>,
  [initialValidate]: ReactState<Partial<Record<keyof T, true>>>
) => {
  return (value: R) => {
    setFormData({ ...formData, [name]: value });
    if (initialValidate[name]) {
      setValidationResults({
        ...validationResults,
        [name]: validator(value),
      });
    }
  };
};

export const getFormProps = <T extends Record<string, unknown>>(
  name: keyof T,
  validator: ValidatorFunc<string | undefined>,
  formDataState: ReactState<T>,
  validationResultsState: ReactState<ValidationResults<T>>,
  initialValidationState: ReactState<Partial<Record<keyof T, true>>>
) => {
  const [formData] = formDataState;

  return {
    value: formData[name],
    onChange: handleFormChange(
      validateOnChange(
        name,
        validator,
        formDataState,
        validationResultsState,
        initialValidationState
      )
    ),
    onBlur: validateOnBlur(
      name,
      validator,
      formDataState,
      validationResultsState,
      initialValidationState
    ),
  };
};
