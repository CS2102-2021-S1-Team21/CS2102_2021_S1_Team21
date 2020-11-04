import baseAPI from './baseAPI';

const bids = {
  applyBids: async (body) => {
    return baseAPI.post('bids', body);
  },
  getPetOwnerBids: async (petOwnerUsername) => {
    return baseAPI.get(`bids/petOwner/${petOwnerUsername}`);
  },
  getCaretakerBids: async (caretakerUsername) => {
    return baseAPI.get(`bids/caretaker/${caretakerUsername}`);
  },
  updateBids: async (body) => {
    return baseAPI.put(`bids/update`, body);
  },
  deleteBid: async ({ petName, petOwnerUsername, caretakerUsername, submittedAt, startDate, endDate }) => {
    return baseAPI.delete(`bids/${petName}/${petOwnerUsername}/${caretakerUsername}/${submittedAt}/${startDate}/${endDate}`);
  },
};

export default bids;
