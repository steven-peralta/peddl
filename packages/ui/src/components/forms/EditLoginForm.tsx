import { Form } from 'react-bootstrap';
import React from 'react';
import { handleFormChange } from './utils';
import FormInput from './FormInput';

export type EditLoginFormProps = {
  email: string;
  onEmailInputChange: (email: string) => void;
  onEmailInputBlur: () => void;
  emailRequired?: boolean;
  emailValidationText?: string;

  password: string;
  onPasswordInputChange: (password: string) => void;
  onPasswordInputBlur: () => void;
  passwordRequired?: boolean;
  passwordValidationText?: string;

  confirmPassword: string;
  onConfirmPasswordInputChange: (confirmPassword: string) => void;
  onConfirmPasswordInputBlur: () => void;
  confirmPasswordRequired?: boolean;
  confirmPasswordValidationText?: string;
};

export default function EditLoginForm({
  email,
  onEmailInputChange,
  onEmailInputBlur,
  emailRequired = false,
  emailValidationText,

  password,
  onPasswordInputChange,
  onPasswordInputBlur,
  passwordRequired = false,
  passwordValidationText,

  confirmPassword,
  onConfirmPasswordInputChange,
  onConfirmPasswordInputBlur,
  confirmPasswordRequired = false,
  confirmPasswordValidationText,
}: EditLoginFormProps) {
  return (
    <div>
      <FormInput
        htmlFor="email"
        label="E-mail"
        required={emailRequired}
        validationText={emailValidationText}
      >
        <Form.Control
          id="email"
          isInvalid={!!emailValidationText}
          name="email"
          onBlur={onEmailInputBlur}
          onChange={handleFormChange(onEmailInputChange)}
          placeholder="name@example.com"
          required={emailRequired}
          type="email"
          value={email}
        />
      </FormInput>

      <FormInput
        htmlFor="password"
        label="Password"
        required={passwordRequired}
        validationText={passwordValidationText}
      >
        <Form.Control
          id="password"
          isInvalid={!!passwordValidationText}
          name="password"
          onBlur={onPasswordInputBlur}
          onChange={handleFormChange(onPasswordInputChange)}
          placeholder="Password"
          type="password"
          value={password}
        />
      </FormInput>

      <FormInput
        htmlFor="confirmPassword"
        label="Confirm password"
        required={confirmPasswordRequired}
        validationText={confirmPasswordValidationText}
      >
        <Form.Control
          id="confirmPassword"
          isInvalid={!!confirmPasswordValidationText}
          name="confirmPassword"
          onBlur={onConfirmPasswordInputBlur}
          onChange={handleFormChange(onConfirmPasswordInputChange)}
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
        />
      </FormInput>
    </div>
  );
}
