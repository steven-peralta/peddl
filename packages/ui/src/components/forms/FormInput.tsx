import React from 'react';
import { Form } from 'react-bootstrap';
import { isValidationFailure, ValidationResult } from '@peddl/common';

export type FormInputProps = {
  label: string;
  htmlFor?: string;
  required?: boolean;
  validationResult?: ValidationResult;
};

export default function FormInput({
  label,
  htmlFor,
  required,
  validationResult,
  children,
}: React.PropsWithChildren<FormInputProps>) {
  return (
    <Form.Group className="mb-3">
      <Form.Label
        className={required ? 'required-field' : ''}
        htmlFor={htmlFor}
      >
        {label}
      </Form.Label>
      {children}
      {validationResult && isValidationFailure(validationResult) && (
        <Form.Control.Feedback style={{ display: 'block' }} type="invalid">
          {validationResult.reason}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
