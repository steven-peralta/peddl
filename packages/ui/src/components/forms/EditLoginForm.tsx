import { Form } from 'react-bootstrap';
import React from 'react';
import handleFormChange from './utils';

export type EditLoginFormProps = {
  onEmailInputChange: (email: string) => void;
  onPasswordInputChange: (password: string) => void;
  onConfirmPasswordInputChange: (confirmPassword: string) => void;
};

export default function EditLoginForm({
  onEmailInputChange,
  onPasswordInputChange,
  onConfirmPasswordInputChange,
}: EditLoginFormProps) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          id="email"
          type="email"
          placeholder="name@example.com"
          name="email"
          onChange={handleFormChange(onEmailInputChange)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleFormChange(onPasswordInputChange)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
        <Form.Control
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleFormChange(onConfirmPasswordInputChange)}
        />
      </Form.Group>
    </div>
  );
}
