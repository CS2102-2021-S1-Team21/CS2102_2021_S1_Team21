import baseAPI from './baseAPI';

const caretakerMonthlyInfo = {
  getPetDay: async (username) => {
    return baseAPI.get(`petday/${username}`);
  },
};

export default caretakerMonthlyInfo;
