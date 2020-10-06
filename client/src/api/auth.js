import { removeSessionCookie } from '../utilities/sessionCookie';
import baseAPI from './baseAPI';

const auth = {
  login: async ({ username, password }) => {
    return baseAPI.post('login', { username, password });
  },
  logout: async () => {
    try {
      await baseAPI.delete('logout');
      removeSessionCookie();
    } catch (error) {
      console.error(error);
    }
  },
  signup: async (userAttributes) => {
    return baseAPI.post('signup');
  },
};

export default auth;
