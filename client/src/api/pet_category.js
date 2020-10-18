import baseAPI from './baseAPI';

const pet_category = {
  getPet_category: async () => {
    return baseAPI.get(`pet_category`);
  },

  getDailyPrice: async (categoryName) => {
    return baseAPI.get(`pet_category/${categoryName}`);
  }
};


export default pet_category;