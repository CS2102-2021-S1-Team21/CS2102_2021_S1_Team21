import baseAPI from './baseAPI';

const users = {
  signup: async (newUser) => {
    return baseAPI.post('users', newUser);
  },
  deleteUser: async (username) => {
    return baseAPI.delete(`users/${username}`);
  },
  addAdmin: async (newAdmin) => {
    return baseAPI.post('admins', newAdmin);
  },
  deleteAdmin: async (username) => {
    return baseAPI.delete(`admins/${username}`);
  },
};

export default users;
