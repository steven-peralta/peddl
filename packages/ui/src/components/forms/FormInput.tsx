import React from 'react';
import { Form } from 'react-bootstrap';

export type FormInputProps = {
  label: string;
  htmlFor?: string;
  required?: boolean;
  validationText?: string;
  forceShowValidation?: boolean;
  children: JSX.Element | JSX.Element[];
};

export default function FormInput({
  label,
  htmlFor,
  required,
  validationText,
  forceShowValidation,
  children,
}: FormInputProps) {
  return (
    <Form.Group className="mb-3">
      <Form.Label
        className={required ? 'required-field' : ''}
        htmlFor={htmlFor}
      >
        {label}
      </Form.Label>
      {children}
      {forceShowValidation ? (
        validationText && (
          <Form.Control.Feedback style={{ display: 'block' }} type="invalid">
            {validationText}
          </Form.Control.Feedback>
        )
      ) : (
        <Form.Control.Feedback type="invalid">
          {validationText}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
