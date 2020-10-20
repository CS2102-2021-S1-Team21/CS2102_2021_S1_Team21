import baseAPI from './baseAPI';

const caresFor = {
  getAllCaresFor: async () => {
    return baseAPI.get('caresfor');
  },
  getCaretakerCaresFor: async (username) => {
    return baseAPI.get(`caresfor/${username}`);
  },
  editCaretakerCaresFor: async (username, body) => {
    return baseAPI.put(`caresfor/${username}`, body);
  },
};

export default caresFor;
