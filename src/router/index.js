import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/views/business/ProductList.vue';
import Checkout from '@/views/business/Checkout.vue';
import Login from '@/views/users/Login.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/checkout', component: Checkout },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
