import baseAPI from './baseAPI';

const users = {
  signup: async (userAttributes) => {
    return baseAPI.post('users');
  },
  deleteUser: async (username) => {
    return baseAPI.delete(`users/${username}`);
  },
  addAdmin: async (newAdmin) => {
    return baseAPI.post('admins', newAdmin);
  },
}

export default users;
