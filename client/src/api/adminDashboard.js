import baseAPI from './baseAPI';

const adminDashboard = {
  getCaretakerRanking: async () => {
    return baseAPI.get('admin-dashboard/leaderboard');
  },
  getPerformance: async() => {
    return baseAPI.get('admin-dashboard/performance');
  }
};

export default adminDashboard;
