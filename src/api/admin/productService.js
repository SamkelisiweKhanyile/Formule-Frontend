import axios from '@/api/axiosInstance';

const baseUrl = '/product'; 

const productAPI = {
  create: async (productData) => {
    try {
      const response = await axios.post(`${baseUrl}/create`, productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error.response?.data || error.message);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${baseUrl}/getall`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error.response?.data || error.message);
      throw error;
    }
  },

  update: async (productData) => {
    try {
      const response = await axios.put(`${baseUrl}/update`, productData);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default productAPI;