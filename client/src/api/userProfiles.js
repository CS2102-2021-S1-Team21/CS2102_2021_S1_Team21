import baseAPI from './baseAPI';

const userProfiles = {
  getUserProfiles: async () => {
    return baseAPI.get('profile');
  },
  getUserProfile: async (username) => {
    return baseAPI.get(`profile/${username}`);
  },
};

export default userProfiles;
