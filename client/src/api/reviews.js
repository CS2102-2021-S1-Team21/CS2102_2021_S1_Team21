import baseAPI from './baseAPI';

const reviews = {
  getReviews: async () => {
    return baseAPI.get('reviews');
  },
  getReview: async (email) => {
    return baseAPI.get(`reviews/${email}`);
  },
};

export default reviews;
