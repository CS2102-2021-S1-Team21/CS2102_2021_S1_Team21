import baseAPI from './baseAPI';

const paymentMethod = {
  getPaymentMethods: async () => {
    return baseAPI.get('paymentMethod');
  },
};

export default paymentMethod;
