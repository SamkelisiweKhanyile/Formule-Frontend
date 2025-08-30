import axios from 'axios';

const apiUrl = 'http://localhost:8080/formule/customer';

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

  getAll: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAll`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching customers:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/get/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching customer by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },


  update: async (id, customerData) => {
    try {
      const response = await axios.put(`${apiUrl}/update/${id}`, customerData);
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
  }
};

export default customerAPI;
