import { Form } from 'react-bootstrap';
import React from 'react';

export default function EditLoginForm() {
  return (
    <Form>
      <div className="mb-3">
        <h2>Login</h2>
      </div>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control id="email" type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control id="password" type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label htmlFor="confirm-password">Confirm Password</Form.Label>
        <Form.Control
          id="confirm-password"
          type="password"
          placeholder="Password"
        />
      </Form.Group>
    </Form>
  );
}
