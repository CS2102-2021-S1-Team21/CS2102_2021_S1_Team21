import baseAPI from './baseAPI';

const profileSettings = {
  getUserDetails: async (username) => {
    return baseAPI.get(`profile-settings/${username}`);
  },
  updateUserDetails: async (body) => {
    return baseAPI.put(`profile-settings/${body.username}`, body);
  },
  getAdminDetails: async (username) => {
    return baseAPI.get(`profile-settings/admin/${username}`);
  },
  updateAdminDetails: async (body) => {
    return baseAPI.put(`profile-settings/admin/${body.username}`, body);
  },
};

export default profileSettings;
