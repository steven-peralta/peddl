import {
  CreateUserBody,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from '@peddl/common';
import { Form } from 'react-bootstrap';
import React from 'react';
import FormInput from './FormInput';
import { getFormProps, handleFormChange } from './utils';
import { ValidationFormProps } from './types';

export type UserDetailsFormData = Partial<
  Omit<CreateUserBody, 'searchPreferences' | 'profile'> & {
    confirmPassword: string;
  }
>;

export default function UserDetailsForm({
  dataState,
  validationState,
  initialValidateState,
}: ValidationFormProps<UserDetailsFormData>) {
  const [data, setData] = dataState;
  const [validationResults, setValidationResults] = validationState;
  const [initialValidate, setInitialValidate] = initialValidateState;

  return (
    <div>
      <h2 className="mb-3">Login info</h2>
      <FormInput
        htmlFor="email"
        label="E-mail"
        required
        validationResult={validationResults.email}
      >
        <Form.Control
          id="email"
          name="email"
          placeholder="name@example.com"
          required
          type="email"
          {...getFormProps(
            'email',
            validateEmail,
            dataState,
            validationState,
            initialValidateState
          )}
        />
      </FormInput>
      <FormInput
        htmlFor="password"
        label="Password"
        required
        validationResult={validationResults.password}
      >
        <Form.Control
          autoCapitalize="new-password"
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          {...getFormProps(
            'password',
            validatePassword,
            dataState,
            validationState,
            initialValidateState
          )}
        />
      </FormInput>
      <FormInput
        htmlFor="confirmPassword"
        label="Confirm password"
        required
        validationResult={validationResults.confirmPassword}
      >
        <Form.Control
          id="confirmPassword"
          name="confirmPassword"
          onBlur={() => {
            setValidationResults({
              ...validationResults,
              confirmPassword: validateConfirmPassword(
                data.password,
                data.confirmPassword
              ),
            });
            if (!initialValidate.confirmPassword) {
              setInitialValidate({ ...initialValidate, confirmPassword: true });
            }
          }}
          onChange={handleFormChange((confirmPassword) => {
            setData({ ...data, confirmPassword });
            if (initialValidate.confirmPassword) {
              setValidationResults({
                ...validationResults,
                confirmPassword: validateConfirmPassword(
                  data.password,
                  confirmPassword
                ),
              });
            }
          })}
          placeholder="Confirm Password"
          type="password"
          value={data.confirmPassword}
        />
      </FormInput>
    </div>
  );
}
