import { createRouter, createWebHistory } from 'vue-router'

import AuthPage from '@/views/users/AuthPage.vue'
import HomePage from '@/views/business/HomePage.vue'
import customerProfile from '@/views/users/customer/CustomerProfile.vue'
import ProductDetails from '@/views/business/ProductDetailsPage.vue'
import CategoriesPage from '@/views/business/CategoriesPage.vue'
import CategoryPage from '@/views/business/CategoryPage.vue'
import CartPage from '@/views/business/CartPage.vue'
import CheckoutPage from '@/views/business/CheckoutPage.vue'
import Orders from '@/views/business/OrderPage.vue'
import OrderDetails from '@/views/business/OrderDetailsPage.vue'
import AddressForm from '@/components/generic/AddressForm.vue'
import AdminDashboard from '@/views/users/admin/AdminDashboard.vue'


const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/auth', name: 'Auth', component: AuthPage },
  { path: '/customer/profile', name:'cProfile', component:customerProfile},
  { path: '/product/:id', name: 'productDetails', component: ProductDetails },
  { path: '/categories', name: 'Categories', component: CategoriesPage},
  // { path: '/categories/:id', name: 'Category', component: CategoryPage, props: true },
 //  { path: '/category', name: 'Category', component: CategoryPage },
  { path: '/cart', name: 'Cart', component: CartPage },
  { path: '/checkout', name: 'Checkout', component: CheckoutPage },
  { path: '/orders', name: 'Orders', component: Orders },
  { path: '/order/details', name: 'OrderDetails', component: OrderDetails },
  { path: '/address', name: 'AddressForm', component: AddressForm },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard },

  // If an endpoint fails, it'll take you to the homepage
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
