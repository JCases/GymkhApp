import axios from 'axios';
import { Errors } from '../shared/';

// FIXME: Link for Requests
const client = axios.create({ baseURL: 'http://localhost:3005/v1' });

client.interceptors.request.use((config) => {
  // config.headers.authorization = `Bearer ${localStorage.getItem('user-jwt')}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

client.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const response = error.response;
  if (!response) return Promise.reject(error);

  const code = response.status;

  if (code === 401) {
    return Promise.reject({ message: error.response.statusText, code: Errors.incorrectCredentials });
  } else {
    return Promise.reject({ message: error.response.statusText, code: Errors.unexpected });
  }
});

export default client;
