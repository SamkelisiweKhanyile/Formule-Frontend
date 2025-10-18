import axios from '@/api/axiosInstance';

const apiUrl = '/customer';
const authUrl = '/auth'; 

const customerAPI = {

  create: async (customerData) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, customerData);
      return response.data; 
    } catch (error) {
      console.error("Error creating customer:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${authUrl}/login`, { email, password });
      return response.data; 
    } catch (error) {
      console.error("Error logging in:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/read/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching customer by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  update: async (id, customerData) => {
    try {
      const response = await axios.put(`${apiUrl}/update`, customerData); 
      return response.data;  
    } catch (error) {
      console.error("Error updating customer:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);
      return response.data;  
    } catch (error) {
      console.error("Error deleting customer:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
  
};

export default customerAPI;