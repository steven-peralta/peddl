import React, { useState } from 'react';
import { FloatingLabel, Button, Container, Form } from 'react-bootstrap';
import './LoginStyles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import handleFormChange from '../../utils/form';
import { useAuth } from '../../components/AuthProvider';

export default function LoginPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [showError, setError] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    login: [doLogin],
  } = useAuth();

  return (
    <Container>
      <div className="mb-3 p-5">
        <h1 className="mb-3">Sign in</h1>
        <p hidden={showError} style={{ color: 'red' }}>
          Email or Password is incorrect
        </p>
        <div>
          <FloatingLabel
            className="mb-3"
            controlId="floatingInput"
            label="Email address"
          >
            <Form.Control
              onChange={handleFormChange(setEmail)}
              placeholder="name@example.com"
              type="email"
              value={email}
            />
          </FloatingLabel>
          <div className="d-flex flex-column mb-2">
            <FloatingLabel
              className="align-items-start mb-3"
              controlId="floatingPassword"
              label="Password"
            >
              <Form.Control
                onChange={handleFormChange(setPassword)}
                placeholder="Password"
                type={passwordShown ? 'text' : 'password'}
                value={password}
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
            <Button
              className="signInBtn"
              onClick={async () => {
                try {
                  await doLogin({ email, password });
                  navigate(state?.path || '/profiles');
                } catch (err) {
                  if (err === axios.isAxiosError(err)) {
                    setError(false);
                    console.log(err);
                  }
                }
              }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
