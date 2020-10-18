import baseAPI from './baseAPI';

const transfer_type = {
  getTransfer_types: async () => {
    return baseAPI.get('transfer_type');
  }
};

export default transfer_type;
