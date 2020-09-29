import baseAPI from './baseAPI';

const leaves = {
  applyLeave: async (body) => {
    return baseAPI.post('leaves', body);
  },
  getLeaves: async (email) => {
    return baseAPI.get(`leaves/${email}`);
  },
};

export default leaves;
