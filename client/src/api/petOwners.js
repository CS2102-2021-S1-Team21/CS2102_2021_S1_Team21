import baseAPI from './baseAPI';

const petOwners = {
  getPetOwners: async () => {
    return baseAPI.get('pet-owners');
  },
  getPetOwner: async (username) => {
    return baseAPI.get(`pet-owners/${username}`);
  },
  getCreditCard: async (body) => {
    return baseAPI.get(`pet-owners/cc/${body.username}`);
  },
  editCreditCard: async (body) => {
    return baseAPI.put(`pet-owners/cc/${body.petownerusername}`, body);
  },
};

export default petOwners;
