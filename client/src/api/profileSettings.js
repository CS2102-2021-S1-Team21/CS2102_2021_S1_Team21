import baseAPI from './baseAPI';

const profileSettings = {
  getUserDetails: async (username) => {
    return baseAPI.get(`profile-settings/${username}`);
  },
  updateUserDetails: async (body) => {
    return baseAPI.put(`profile-settings/${body.username}`, body);
  },
};

export default profileSettings;
