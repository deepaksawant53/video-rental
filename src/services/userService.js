import http from './common/httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + 'users';

const registerUser = user => {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
};

export default {
  registerUser
};