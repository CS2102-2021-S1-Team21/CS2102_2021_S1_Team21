import { removeSessionCookie } from '../utilities/sessionCookie';
import baseAPI from './baseAPI';

const auth = {
  login: async ({ username, password }) => {
    return baseAPI.post('sessions', { username, password });
  },
  logout: async () => {
    try {
      const response = await baseAPI.delete('sessions');
      removeSessionCookie();
      return response;
    } catch (error) {
      console.error(error); // TODO: error handling
      return Promise.reject(error);
    }
  },
  getSessionInfo: async () => {
    return baseAPI.get('sessions');
  },
  signup: async (userAttributes) => {
    return baseAPI.post('users');
  },
};

export default auth;
