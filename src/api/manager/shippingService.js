import axios from '@/api/axiosInstance';

const baseUrl = '/shipping';

const shippingAPI = {

  create: async (shippingData) => {
    try {
      const response = await axios.post(`${baseUrl}/create`, shippingData);
      return response.data;
    } catch (error) {
      console.error("Error creating shipping record:", error.response?.data || error.message);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shipping details:", error.response?.data || error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shipping info by ID:", error.response?.data || error.message);
      throw error;
    }
  },

  update: async (shippingData) => {
    try {
      const response = await axios.put(`${baseUrl}/update`, shippingData);
      return response.data;
    } catch (error) {
      console.error("Error updating shipping info:", error.response?.data || error.message);
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