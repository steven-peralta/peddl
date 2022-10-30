import axios from 'axios';

export const baseURL =
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

export default axiosInstance;
