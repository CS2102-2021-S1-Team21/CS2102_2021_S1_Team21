import { removeSessionCookie } from '../utilities/sessionCookie';
import baseAPI from './baseAPI';

const auth = {
  login: async ({ username, password }) => {
    return baseAPI.post('login', { username, password });
  },
  logout: async () => {
    try {
      const response = await baseAPI.delete('logout');
      removeSessionCookie();
      return response;
    } catch (error) {
      console.error(error); // TODO: error handling
      return Promise.reject(error);
    }
  },
  getSessionInfo: async () => {
    return baseAPI.get('session');
  },
  signup: async (userAttributes) => {
    return baseAPI.post('signup');
  },
};

export default auth;
