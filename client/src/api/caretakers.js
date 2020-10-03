import baseAPI from './baseAPI';

const caretakers = {
  getCaretakers: async () => {
    return baseAPI.get('caretakers');
  },
  getCaretaker: async (email) => {
    return baseAPI.get(`caretakers/${email}`);
  },
};

export default caretakers;
