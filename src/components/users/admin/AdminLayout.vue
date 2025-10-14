<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo-container">
        <h2 class="logo">FORMULĒ</h2>
      </div>
      <nav class="nav-links">
        <router-link to="/admin" class="link" exact-active-class="active">Dashboard</router-link>
        <router-link to="/admin/products" class="link" exact-active-class="active">Products</router-link>
        <router-link to="/admin/orders" class="link" exact-active-class="active">Orders</router-link>
        <router-link to="/admin/admins" class="link" exact-active-class="active">Admins</router-link>
        <router-link to="/admin/managers" class="link" exact-active-class="active">Managers</router-link>
        <router-link to="/admin/customers" class="link" exact-active-class="active">Customers</router-link>
        <router-link to="/admin/categories" class="link" exact-active-class="active">Categories</router-link>
        <router-link to="/admin/shipping" class="link" exact-active-class="active">Shipping</router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="content">
      <header class="topbar">
        <h1 class="page-title">{{ pageTitle }}</h1>
        <div class="profile">
          <div class="avatar">A</div>
          <span class="profile-name">Admin</span>
        </div>
      </header>

      <section class="main-view">
        <router-view />
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const titles = {
  AdminDashboard: 'Dashboard',
  ManageAdmins: 'Admins',
  ManageManagers: 'Managers',
  ManageCustomers: 'Customers',
  ManageProducts: 'Products',
  ManageOrders: 'Orders',
  ManageCategories: 'Categories',
  ManageShipping: 'Shipping'
}

const pageTitle = computed(() => titles[route.name] || 'Dashboard')
</script>

<style scoped>
/* Layout */
.admin-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  background: #f0f3f7;
  color: #30491e;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background: linear-gradient(180deg, #30491e 0%, #556b2f 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  box-shadow: 4px 0 12px rgba(0,0,0,0.1);
  transition: width 0.3s ease;
}

.logo-container {
  margin-bottom: 2rem;
  text-align: center;
}

.logo {
  font-size: 2rem;
  font-weight: 700;
  color: #d4e157;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link {
  display: block;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  font-weight: 500;
  color: #fff;
  transition: all 0.3s ease;
  background: rgba(255,255,255,0.05);
  text-align: left;
}

.link:hover {
  background: rgba(255,255,255,0.15);
  transform: translateX(4px);
}

.link.active {
  background: #d4e157;
  color: #30491e;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

/* Main content */
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Topbar */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border-radius: 0 0 16px 16px;
  margin-bottom: 1rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #30491e;
}

.profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 40px;
  height: 40px;
  background: #d4e157;
  color: #30491e;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.profile-name {
  font-weight: 500;
  color: #30491e;
}

/* Router View */
.main-view {
  flex: 1;
  padding: 2rem;
  background: #f5f7f9;
  border-radius: 16px;
  margin: 0 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}
</style>