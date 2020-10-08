import baseAPI from './baseAPI';

const petOwners = {
  getPetOwners: async () => {
    return baseAPI.get('pet-owners');
  },
  getPetOwner: async (username) => {
    return baseAPI.get(`pet-owners/${username}`);
  },
};

export default petOwners;
