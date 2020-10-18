import baseAPI from './baseAPI';

const bids = {
  applyBids: async (body) => {
    return baseAPI.post('bids', body);
  },
  getBids: async (petOwnerUsername) => {
    return baseAPI.get(`bids/${petOwnerUsername}`);
  },
};

export default bids;