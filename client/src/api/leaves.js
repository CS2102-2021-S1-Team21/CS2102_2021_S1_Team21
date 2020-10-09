import baseAPI from './baseAPI';

const leaves = {
  applyLeave: async (body) => {
    return baseAPI.post('leaves', body);
  },
  getLeaves: async (caretakerUsername) => {
    return baseAPI.get(`leaves/${caretakerUsername}`);
  },
  getAllPendingLeaves : async () => {
    return baseAPI.get(`leaves`);
  },
};

export default leaves;
