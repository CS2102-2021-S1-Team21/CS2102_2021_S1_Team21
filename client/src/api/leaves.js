import baseAPI from './baseAPI';

const leaves = {
  applyLeave: async (body) => {
    return baseAPI.post('leaves', body);
  },
  getLeaves: async (caretakerUsername) => {
    return baseAPI.get(`leaves/${caretakerUsername}`);
  },
  getAllPendingLeaves: async () => {
    return baseAPI.get(`leaves`);
  },
  updateLeaveApproved: async (caretakerUsername, startDate, endDate) => {
    return baseAPI.put(`leaves/${caretakerUsername}/${startDate}/${endDate}`);
  },
  cancelLeave: async (body) => {
    return baseAPI.post(`leaves/delete`, body)
  }
};

export default leaves;
