import baseAPI from './baseAPI';

const transferType = {
  getTransferTypes: async () => {
    return baseAPI.get('transferType');
  },
};

export default transferType;
