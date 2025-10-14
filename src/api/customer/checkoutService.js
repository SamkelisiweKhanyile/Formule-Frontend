// src/api/business/CheckoutService.js
import axios from '@/api/axiosInstance';

const baseUrl = '/checkout'; 

const checkoutAPI = {
  create: async (checkoutData) => {
    try {
      const response = await axios.post(`${baseUrl}/create`, checkoutData);
      return response.data;
    } catch (error) {
      console.error("Error creating checkout:", error.response?.data || error.message);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching checkouts:", error.response?.data || error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/get/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching checkout by ID:", error.response?.data || error.message);
      throw error;
    }
  },

  update: async (checkoutData) => {
    try {
      const response = await axios.put(`${baseUrl}/update`, checkoutData);
      return response.data;
    } catch (error) {
      console.error("Error updating checkout:", error.response?.data || error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting checkout:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default checkoutAPI;