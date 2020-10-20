import baseAPI from './baseAPI';

const caretakers = {
  getCaretakers: async () => {
    return baseAPI.get('caretakers');
  },
  getCaretaker: async (username) => {
    return baseAPI.get(`caretakers/${username}`);
  },
};

export default caretakers;
