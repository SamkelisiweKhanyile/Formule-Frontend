import axios from '@/api/axiosInstance';

const baseUrl = '/order';

const orderAPI = {

  getAll: async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
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

  update: async (orderData) => {
    try {
      const response = await axios.put(`${baseUrl}/update`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error.response?.data || error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error.response?.data || error.message);
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