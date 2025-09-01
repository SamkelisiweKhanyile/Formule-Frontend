import axios from 'axios';

const apiUrl = 'http://localhost:8080/formule/checkout';

const checkoutAPI = {


  create: async (checkoutData) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, checkoutData);
      return response.data;
    } catch (error) {
      console.error("Error creating checkout:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  
  getAll: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching checkouts:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

 
  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/get/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching checkout by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  
  update: async (id, checkoutData) => {
    try {
      const response = await axios.put(`${apiUrl}/update/${id}`, checkoutData);
      return response.data;
    } catch (error) {
      console.error("Error updating checkout:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

 
  delete: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting checkout:", error.response ? error.response.data : error.message);
      throw error;
    }
  }
};

export default checkoutAPI;
