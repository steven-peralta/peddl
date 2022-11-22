import React, { useState } from 'react';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import './LoginStyles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '@peddl/common';
import handleFormChange from '../../utils/form';
import { useAuth } from '../../providers/AuthProvider';
import axiosInstance from '../../utils/axiosInstance';
import { useSettings } from '../../providers/SettingsProvider';
import Content from '../../components/Content';

export default function LoginPage() {
  const { setSettings } = useSettings();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [error, setError] = useState<Error | undefined>(undefined);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    login: [doLogin],
  } = useAuth();

  return (
    <Content title="Sign in">
      <p hidden={!!error} style={{ color: 'red' }}>
        {error?.message}
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
                const { userId, token } = await doLogin({ email, password });
                const { data } = await axiosInstance.get<User>(
                  `/users/${userId}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                setSettings(data.searchPreferences);
                navigate(state?.path || '/profiles');
              } catch (err) {
                if (axios.isAxiosError(err)) {
                  setError(err);
                }
              }
            }}
          >
            Sign in
          </Button>
        </div>
      </div>
    </Content>
  );
}
