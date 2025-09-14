// src/api/business/CategoryService.js
import axios from "axios";

const API_BASE = "http://localhost:8080/formule"; // adjust if your backend runs elsewhere

export default {
  // fetch all categories
  getAllCategories() {
    return axios.get(`${API_BASE}/category/getall`);
  },

  // fetch products by category
  getProductsByCategory(categoryId) {
    return axios.get(`${API_BASE}/product/category/${categoryId}`);
  }
};
