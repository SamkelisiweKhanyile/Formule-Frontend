import { createRouter, createWebHistory } from 'vue-router'

import ProductList from '@/views/business/ProductList.vue'
import CartPage from '@/views/business/CartPage.vue'
import Checkout from '@/views/business/Checkout.vue'

// Admin
import AdminDashboard from '@/views/users/admin/AdminDashboard.vue'

// Customer
import customerProfile from '@/views/users/customer/CustomerProfile.vue'

// Generic
import AuthPage from '@/views/users/AuthPage.vue'



const routes = [
  { path: '/', name: 'Home', component: ProductList },
  { path: '/products', name: 'Products', component: ProductList },
  { path: '/cart', name: 'Cart', component: CartPage },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/auth', name: 'Auth', component: AuthPage },
  { path: '/customer/profile', name:'cProfile', component:customerProfile},
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard },


  { path: '/:pathMatch(.*)*', redirect: '/' }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))


  if (to.name === 'AdminDashboard') {
    if (!user || user.role !== 'admin') {
      return next({ name: 'Auth' })
    }
  }


  if (to.name === 'Checkout') {
    if (!user) {
      return next({ name: 'Auth' })
    }
  }

  next() 
})

export default router
