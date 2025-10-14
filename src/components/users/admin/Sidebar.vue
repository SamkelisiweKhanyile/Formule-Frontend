<template>
  <div class="sidebar">
    <h2>Admin</h2>
    <ul>
      <li><router-link to="/admin">Dashboard</router-link></li>
      <li><router-link to="/admin/products">Products</router-link></li>
      <li><router-link to="/admin/orders">Orders</router-link></li>
      <li><router-link to="/admin/users">Users</router-link></li>
      <li><router-link to="/admin/settings">Settings</router-link></li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background: #1e1e2d;
  color: white;
  padding: 20px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar a {
  color: white;
  text-decoration: none;
}
.sidebar a.router-link-active {
  font-weight: bold;
}
</style>