import axios from 'axios';
const API_URL = 'http://localhost:8080/api/business/products';

export default {
  getProducts() { return axios.get(API_URL).then(res => res.data); },
  getProductById(id) { return axios.get(`${API_URL}/${id}`).then(res => res.data); }
};
