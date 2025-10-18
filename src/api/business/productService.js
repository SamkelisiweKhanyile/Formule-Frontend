import axios from '@/api/axiosInstance';

const apiUrl = '/product';

const productAPI = {
  create: async (productData) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  update: async (productData) => {
    try {
      const response = await axios.put(`${apiUrl}/update`, productData);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all products:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getByCategory: async (categoryId) => {
    try {
      const response = await axios.get(`${apiUrl}/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default productAPI;