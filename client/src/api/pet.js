import baseAPI from './baseAPI';

const pet = {
  getPet: async (petOwnerUsername) => {
    return baseAPI.get(`pet/${petOwnerUsername}`);
  },
};

export default pet;
