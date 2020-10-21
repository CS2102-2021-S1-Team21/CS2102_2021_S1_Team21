import baseAPI from './baseAPI';

const petCategory = {
  getPetCategory: async () => {
    return baseAPI.get(`petCategory`);
  },

  getDailyPrice: async (categoryName) => {
    return baseAPI.get(`petCategory/${categoryName}`);
  },
};

export default petCategory;
