import baseAPI from './baseAPI';

const petOwners = {
  getPetOwners: async () => {
    return baseAPI.get('pet-owners');
  },
  getPetOwner: async (email) => {
    return baseAPI.get(`pet-owners/${encodeURIComponent(email)}`);
  },
};

export default petOwners;
