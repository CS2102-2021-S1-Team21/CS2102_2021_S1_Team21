import baseAPI from './baseAPI';

const caretakers = {
  getCaretakerRanking: async () => {
    return baseAPI.get('admin-dashboard');
  },
};

export default caretakers;
