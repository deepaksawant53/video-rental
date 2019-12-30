import http from './common/httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + 'auth';

const login = (email, password) => {
  return http.post(apiEndpoint, { email, password });
}

export default {
  login
}