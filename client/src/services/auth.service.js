import axios from 'axios';

const API_URL = 'http://localhost:5005/api/auth';

const signup = (username, email, password) => {
  return axios
    .post(API_URL + '/signup', {
      username,
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + '/login', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const me = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  signup,
  login,
  logout,
  me,
};

export default authService;
