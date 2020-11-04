import baseAPI from './baseAPI';

const petCategories = {
  getPetCategories: async () => {
    return baseAPI.get(`pet-categories/`);
  },

  getDailyPrice: async (categoryName) => {
    return baseAPI.get(`pet-categories/${categoryName}`);
  },
};

export default petCategories;
