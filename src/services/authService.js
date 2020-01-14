import http from './common/httpService';
import config from '../config.json';
import jwtDecode from 'jwt-decode';

const apiEndpoint = config.apiUrl + 'auth';
const tokenKey = "token";

http.setJwt(getJwt());

const login = async (email, password) => {
  const {data: jwt} = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
};

const logout = () => {
  localStorage.removeItem(tokenKey);
};

const loginWithJwt = jwt => {
  localStorage.setItem(tokenKey, jwt);
};

const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);

  } catch (error) {

  }
};

export function getJwt() {
  return localStorage.getItem(tokenKey);
};

export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
  getJwt
}