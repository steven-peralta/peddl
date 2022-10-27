import React, { useState } from 'react';
import { FloatingLabel, Button, Container, Form } from 'react-bootstrap';
import './LoginStyles.css';
import { Eye } from 'react-bootstrap-icons';

export default function LoginPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <Container>
      <div className="mb-3 p-5">
        <h1 className="mb-3">Sign in</h1>
        <div>
          <FloatingLabel
            className="mb-3"
            controlId="floatingInput"
            label="Email address"
          >
            <Form.Control placeholder="name@example.com" type="email" />
          </FloatingLabel>
          <div className="d-flex flex-row align-items-center mb-3 justify-content-between">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                placeholder="Password"
                type={passwordShown ? 'text' : 'password'}
              />
            </FloatingLabel>
            <Eye
              onClick={togglePassword}
              style={{ color: passwordShown ? 'red' : 'grey' }}
            />
          </div>
          <div className="button-container">
            <Button className="signInBtn">Sign in</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
