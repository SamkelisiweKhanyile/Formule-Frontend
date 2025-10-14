import { createRouter, createWebHistory } from 'vue-router'

import AuthPage from '@/views/users/AuthPage.vue'
import HomePage from '@/views/business/HomePage.vue'
import customerProfile from '@/views/users/customer/CustomerProfile.vue'
import ProductDetails from '@/views/business/ProductDetailsPage.vue'
import CategoriesPage from '@/views/business/CategoriesPage.vue'
import CartPage from '@/views/business/CartPage.vue'
import CheckoutPage from '@/views/business/CheckoutPage.vue'
import Orders from '@/views/business/OrderPage.vue'
import OrderDetails from '@/views/business/OrderDetailsPage.vue'
import AddressForm from '@/components/generic/AddressForm.vue'
import AdminDashboard from '@/views/users/admin/Dashboard.vue'
import ManageAdmins from '@/views/users/admin/ManageAdmins.vue'
import ManageManagers from '@/views/users/admin/ManageManagers.vue'
import ManageCustomers from '@/views/users/admin/ManageCustomers.vue'
import ManageCategories from '@/views/users/admin/ManageCategories.vue'
import ManageOrders from '@/views/users/admin/ManageOrders.vue'
import ManageProducts from '@/views/users/admin/ManageProducts.vue'
import AdminLayout from '@/components/users/admin/AdminLayout.vue' 
import ManageShipping from '@/views/users/admin/ManageShipping.vue'


const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/auth', name: 'Auth', component: AuthPage },
  { path: '/customer/profile', name:'cProfile', component:customerProfile},
  { path: '/product/:id', name: 'productDetails', component: ProductDetails },
  { path: '/categories', name: 'Categories', component: CategoriesPage},
  { path: '/cart', name: 'Cart', component: CartPage },
  { path: '/checkout', name: 'Checkout', component: CheckoutPage },
  { path: '/orders', name: 'Orders', component: Orders },
  { path: '/order/details', name: 'OrderDetails', component: OrderDetails },
  { path: '/address', name: 'AddressForm', component: AddressForm },

  {
    path: '/admin',
    component: AdminLayout,
    children:[
      {path: '', name: 'AdminDashboard', component:AdminDashboard},
      {path: 'admins', name: 'ManageAdmins', component:ManageAdmins},
      {path: 'managers', name: 'ManageManagers', component:ManageManagers},
      {path: 'customers', name: 'ManageCustomers', component:ManageCustomers},
      {path: 'products', name: 'ManageProducts', component:ManageProducts},
      {path: 'categories', name: 'ManageCategories', component:ManageCategories},
      {path: 'orders', name: 'ManageOrders', component:ManageOrders},
      {path: 'shipping', name: 'ManageShipping', component:ManageShipping},
    ]
  }, 

  //   {
  //   path: '/manager',
  //   component: ManagerLayout,
  //   children:[
  //     {path: '', name: 'ManagerDashboard', component:ManagerDashboard},
  //     {path: '/customers', name: 'ManageCustomers', component:ManageCustomers},
  //     {path: '/products', name: 'ManageProducts', component:ManageProducts},
  //     {path: '/orders', name: 'ManageOrders', component:ManageOrders},
  //     {path: '/shipping', name: 'ManageShipping', component:ManageShipping},
  //   ]
  // },


  // If an endpoint fails, it'll take you to the homepage
  { path: '/:pathMatch(.*)*', redirect: '/' }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


// router.beforeEach((to, from, next) => {
//   const user = JSON.parse(localStorage.getItem('user'))

//   if (to.name === 'AdminDashboard') {
//     if (!user || user.role !== 'admin') {
//       return next({ name: 'Auth' })
//     }
//   }

//   next() 
// })

export default router
