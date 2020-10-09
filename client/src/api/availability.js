import baseAPI from './baseAPI';

const availability = {
  addAvailability: async (body) => {
    return baseAPI.post('availability', body);
  },
  getAvailability: async (caretakerUsername) => {
    return baseAPI.get(`availability/${caretakerUsername}`);
  },
};

export default availability;
