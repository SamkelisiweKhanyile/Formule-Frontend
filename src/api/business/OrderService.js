import axios from 'axios';
const API_URL = 'http://localhost:8080/api/business/orders';

export default {
  getOrders() { return axios.get(API_URL).then(res => res.data); },
  createOrder(order) { return axios.post(API_URL, order).then(res => res.data); }
};
