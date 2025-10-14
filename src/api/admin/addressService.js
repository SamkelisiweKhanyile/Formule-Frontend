import axios from '@/api/axiosInstance';

const baseUrl = '/address';

const addressAPI = {

  getAll: async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching addresses:", error.response?.data || error.message);
      throw error;
    }
  },

  findByCustomerId: async (customerId) => {
    try {
      const response = await axios.get(`${baseUrl}/customer/${customerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching addresses for customer:", error.response?.data || error.message);
      throw error;
    }
  },

  update: async (addressData) => {
    try {
      const response = await axios.put(`${baseUrl}/update`, addressData);
      return response.data;
    } catch (error) {
      console.error("Error updating address:", error.response?.data || error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting address:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default addressAPI;