import { createRouter, createWebHistory } from 'vue-router'

import ProductList from '@/views/business/ProductList.vue'
import Checkout from '@/views/business/Checkout.vue'
import AuthPage from '@/views/users/AuthPage.vue'


// Admin
import AdminDashboard from '@/views/users/admin/AdminDashboard.vue'


const routes = [
  { path: '/', name: 'Home', component: ProductList },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/auth', name: 'Auth', component: AuthPage },
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



  next() 
})

export default router
