import baseAPI from './baseAPI';

const profiles = {
  getProfiles: async () => {
    return baseAPI.get('profile');
  },
  getProfile: async (username) => {
    return baseAPI.get(`profile/${username}`);
  },
};

export default profiles;
