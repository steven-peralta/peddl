import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
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
          <Form>
            <div className="input-container mb-2">
              <input
                className="form-control"
                name="email"
                placeholder="Email"
                required
                type="text"
              />
            </div>
            <div className="input-group mb-3">
              <input
                className="form-control"
                name="pass"
                placeholder="Password"
                required
                type={passwordShown ? 'text' : 'password'}
              />
              <div className="input-group-append">
                <Button
                  className="btn"
                  onClick={togglePassword}
                  variant="outline-primary"
                >
                  Show
                </Button>
              </div>
            </div>
            <div className="button-container">
              <Button className="signInBtn">Sign in</Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}
