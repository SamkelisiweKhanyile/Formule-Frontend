import axios from '@/api/axiosInstance';

const apiUrl = '/order';

const orderAPI = {
  create: async (orderData) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  update: async (orderData) => {
    try {
      const response = await axios.put(`${apiUrl}/update`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getall`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all orders:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default orderAPI;