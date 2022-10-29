import {
  CreateProfileFormData,
  CreateUserFormData,
  CreateUserResponse,
  LoginFormData,
  LoginResponse,
} from '@peddl/common';
import axios, { AxiosResponse } from 'axios';

const baseURL =
  process.env['REACT_APP_ENVIRONMENT'] === 'staging'
    ? 'http://api-staging.peddl.chat/v1/'
    : process.env['REACT_APP_ENVIRONMENT'] === 'production' ||
      process.env.NODE_ENV === 'production'
    ? 'https://api.peddl.chat/v1/'
    : 'http://localhost:8080/';

const axiosInstance = axios.create({
  baseURL,
  timeout: 1000,
});

export type ApiRequestFunc<T, R> = (
  data?: T,
  token?: string
) => Promise<AxiosResponse<R>>;

export const createUser: ApiRequestFunc<
  CreateUserFormData,
  CreateUserResponse
> = (data) => {
  return axiosInstance.post('/users', data);
};

export const createProfile: ApiRequestFunc<CreateProfileFormData, null> = (
  data,
  token
) => {
  return axiosInstance.post('/profiles', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const authenticate: ApiRequestFunc<LoginFormData, LoginResponse> = (
  data
) => {
  return axiosInstance.post('/auth', data);
};
