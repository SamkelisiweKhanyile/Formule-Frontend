import axios from 'axios';

const apiUrl = 'http://localhost:8080/formule/product'; // Matches @RequestMapping("/product") in your controller

const productAPI = {

  // Create a new product
  create: async (productData) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // Fetch all products
  getAll: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getall`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // Fetch product by ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // Update a product
  update: async (productData) => {
    try {
      const response = await axios.put(`${apiUrl}/update`, productData);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // Delete a product by ID
  delete: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error.response ? error.response.data : error.message);
      throw error;
    }
  }

};

export default productAPI;