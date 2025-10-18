import axios from '@/api/axiosInstance';

const apiUrl = '/shipping';

const shippingAPI = {
  create: async (shippingData) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, shippingData);
      return response.data;
    } catch (error) {
      console.error("Error creating shipping:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shipping by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  update: async (shippingData) => {
    try {
      const response = await axios.put(`${apiUrl}/update`, shippingData);
      return response.data;
    } catch (error) {
      console.error("Error updating shipping:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting shipping:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getall`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all shipping:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default shippingAPI;