import { Form } from 'react-bootstrap';
import React from 'react';
import handleFormChange from './utils';
import FormInput from './FormInput';

export type EditLoginFormProps = {
  onEmailInputChange: (email: string) => void;
  onPasswordInputChange: (password: string) => void;
  onConfirmPasswordInputChange: (confirmPassword: string) => void;
  emailRequired?: boolean;
  passwordRequired?: boolean;
  confirmPasswordRequired?: boolean;
  emailValidationText?: string;
  passwordValidationText?: string;
  confirmPasswordValidationText?: string;
};

export default function EditLoginForm({
  onEmailInputChange,
  onPasswordInputChange,
  onConfirmPasswordInputChange,
  emailValidationText,
  passwordValidationText,
  confirmPasswordValidationText,
  emailRequired = false,
  passwordRequired = false,
  confirmPasswordRequired = false,
}: EditLoginFormProps) {
  return (
    <div>
      <FormInput
        label="E-mail"
        htmlFor="email"
        validationText={emailValidationText}
        required={emailRequired}
      >
        <Form.Control
          id="email"
          type="email"
          placeholder="name@example.com"
          name="email"
          onChange={handleFormChange(onEmailInputChange)}
          required={emailRequired}
          isInvalid={!!emailValidationText}
        />
      </FormInput>

      <FormInput
        label="Password"
        htmlFor="password"
        validationText={passwordValidationText}
        required={passwordRequired}
      >
        <Form.Control
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleFormChange(onPasswordInputChange)}
          isInvalid={!!passwordValidationText}
        />
      </FormInput>

      <FormInput
        label="Confirm password"
        htmlFor="confirmPassword"
        validationText={confirmPasswordValidationText}
        required={confirmPasswordRequired}
      >
        <Form.Control
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleFormChange(onConfirmPasswordInputChange)}
          isInvalid={!!confirmPasswordValidationText}
        />
      </FormInput>
    </div>
  );
}
