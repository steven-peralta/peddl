import {
  CreateProfileFormData,
  CreateUserFormData,
  CreateUserResponse,
} from '@peddl/common';
import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/v1/',
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
