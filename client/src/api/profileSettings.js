import baseAPI from './baseAPI';

const profileSettings = {
  getUserDetails: async (username) => {
    return baseAPI.get(`profile-settings/${username}`);
  },
  // editUserDetails: async (username) => {
  //   return baseAPI.post(`profile-settings/edit/${username}`);
  // },
};

export default profileSettings;
