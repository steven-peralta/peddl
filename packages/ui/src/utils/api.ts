import {
  CreateProfileFormData,
  CreateUserFormData,
  CreateUserResponse,
} from '@peddl/common';
import axios, { AxiosResponse } from 'axios';

const baseURL =
  process.env['REACT_APP_ENVIRONMENT'] === 'staging'
    ? 'http://api-staging.peddl.chat/v1/'
    : process.env.NODE_ENV === 'production'
    ? 'https://api.peddl.chat/v1'
    : 'http://localhost:8080/v1';

const axiosInstance = axios.create({
  baseURL,
  timeout: 1000,
});

export type ApiRequestFunc<T, R> = (data?: T) => Promise<AxiosResponse<R>>;

export const createUser: ApiRequestFunc<
  CreateUserFormData,
  CreateUserResponse
> = (data) => {
  return axiosInstance.post('/users', data);
};

export const createProfile: ApiRequestFunc<CreateProfileFormData, null> = (
  data
) => {
  return axiosInstance.post('/profiles', data);
};
