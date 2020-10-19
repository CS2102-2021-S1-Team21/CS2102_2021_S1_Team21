import baseAPI from './baseAPI';

const petCategories = {
  getPetCategories: async () => {
    return baseAPI.get(`pet-categories/`);
  },
};

export default petCategories;
