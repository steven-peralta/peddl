import React, { useState } from 'react';
import { FloatingLabel, Button, Container, Form } from 'react-bootstrap';
import './LoginStyles.css';

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
          <div className="d-flex flex-column mb-2">
            <FloatingLabel
              className="align-items-start mb-3"
              controlId="floatingPassword"
              label="Password"
            >
              <Form.Control
                placeholder="Password"
                type={passwordShown ? 'text' : 'password'}
              />
            </FloatingLabel>
            <div className="d-flex flex-row">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    label="Show Password"
                    onClick={togglePassword}
                    type="checkbox"
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className="button-container">
            <Button className="signInBtn">Sign in</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
