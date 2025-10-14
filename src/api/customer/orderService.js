import axios from '@/api/axiosInstance';

const baseUrl = '/order';

const orderAPI = {
  create: async (orderData) => {
    try {
      const response = await axios.post(`${baseUrl}/create`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order by ID:", error.response?.data || error.message);
      throw error;
    }
  },

  getByCustomer: async (customerId) => {
    try {
      const response = await axios.get(`${baseUrl}/customer/${customerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching customer orders:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default orderAPI;