import baseAPI from './baseAPI';

const pets = {
  getPets: async (petOwnerUsername) => {
    return baseAPI.get(`pets/${petOwnerUsername}`);
  },
  getPet: async (petOwnerUsername, petName) => {
    return baseAPI.get(`pets/${petOwnerUsername}/${petName}`);
  },
  addPet: async (body) => {
    return baseAPI.post('pets', body);
  },
  editPet: async (petOwnerUsername, petName, body) => {
    return baseAPI.put(`pets/${petOwnerUsername}/${petName}`, { ...body, petOwnerUsername });
  },
  deletePet: async (petOwnerUsername, petName) => {
    return baseAPI.delete(`pets/${petOwnerUsername}/${petName}`);
  },
};

export default pets;
