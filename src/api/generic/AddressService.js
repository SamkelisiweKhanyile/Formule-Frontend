import axios from 'axios';
const API_URL = 'http://localhost:8080/formule/address';

export default {
  getAllAddresses() {
    return axios.get(API_URL).then(res => res.data);
  },
  createAddress(address) {
    return axios.post(API_URL, address).then(res => res.data);
  }
};