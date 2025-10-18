import axios from '@/api/axiosInstance';

const apiUrl = '/category';

const categoryAPI = {
  create: async (categoryData) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, categoryData);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/read/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching category by ID:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  update: async (categoryData) => {
    try {
      const response = await axios.put(`${apiUrl}/update`, categoryData);
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting category:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all categories:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  findByName: async (name) => {
    try {
      const response = await axios.get(`${apiUrl}/search/name/${name}`);
      return response.data;
    } catch (error) {
      console.error("Error searching category by name:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  searchByDescription: async (keyword) => {
    try {
      const response = await axios.get(`${apiUrl}/search/description`, { params: { keyword } });
      return response.data;
    } catch (error) {
      console.error("Error searching category by description:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default categoryAPI;