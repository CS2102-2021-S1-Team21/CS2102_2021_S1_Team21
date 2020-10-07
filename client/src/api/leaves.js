import baseAPI from './baseAPI';

const leaves = {
  applyLeave: async (body) => {
    return baseAPI.post('leaves', body);
  },
  getLeaves: async (username) => {
    return baseAPI.get(`leaves/${username}`);
  },
};

export default leaves;
