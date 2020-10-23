import baseAPI from './baseAPI';

const caretakers = {
  getCaretakers: async (body) => {
    return baseAPI.get('caretakers', {params :body});
  },
  getCaretaker: async (username) => {
    return baseAPI.get(`caretakers/${username}`);
  },
  browseCaretakers: async (body) => {
    return baseAPI.get(`caretakers/browse`, body);
  },
};

export default caretakers;
