import baseAPI from './baseAPI';

const reviews = {
  getReviews: async () => {
    return baseAPI.get('reviews');
  },
  getReview: async (username) => {
    return baseAPI.get(`reviews/${username}`);
  },
};

export default reviews;
