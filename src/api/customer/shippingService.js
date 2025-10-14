import axios from '@/api/axiosInstance';

const baseUrl = '/shipping';

const shippingAPI = {

  getById: async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shipping info by ID:", error.response?.data || error.message);
      throw error;
    }
  },

  trackByOrder: async (orderId) => {
    try {
      const response = await axios.get(`${baseUrl}/track/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error tracking shipping by order:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default shippingAPI;