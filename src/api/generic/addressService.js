import axios from '@/api/axiosInstance';

const apiUrl = '/address';

const addressAPI = {
  create: async (addressData) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, addressData);
      return response.data;
    } catch (error) {
      console.error("Error creating address:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  read: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error reading address:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  update: async (addressData) => {
    try {
      const response = await axios.put(`${apiUrl}/update`, addressData);
      return response.data;
    } catch (error) {
      console.error("Error updating address:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting address:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getall`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all addresses:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getByCustomerId: async (customerId) => {
    try {
      const response = await axios.get(`${apiUrl}/customer/${customerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching addresses by customer ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default addressAPI;