import baseAPI from './baseAPI';

const profileSettings = {
  getUserDetails: async (username) => {
    return baseAPI.get(`profile-settings/${username}`);
  },
  updateUserDetails: async (body) => {
    return baseAPI.post(`profile-settings/update/${body.username}`, body);
  },
};

export default profileSettings;
