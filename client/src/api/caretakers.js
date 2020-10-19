import baseAPI from './baseAPI';

const caretakers = {
  getCaretakers: async () => {
    return baseAPI.get('caretakers');
  },
  getCaretaker: async (username) => {
    return baseAPI.get(`caretakers/${username}`);
  },
  browseCaretakers: async (body) => {
    return baseAPI.get(`caretakers/browse`, body);
  },
};

export default caretakers;
