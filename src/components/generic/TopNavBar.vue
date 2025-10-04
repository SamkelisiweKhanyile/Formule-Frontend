<template>
  <header class="top-nav-bar">
    <div class="logo">
      <router-link to="/">Formulé</router-link>
    </div>

    <nav :class="{ open: isMobileMenuOpen }">
      <router-link to="/">Home</router-link>
      <router-link to="/categories">Categories</router-link>
      <router-link to="/cart">Cart</router-link>
      <router-link v-if="user" to="/orders">Orders</router-link>
      <router-link v-if="user?.role === 'admin'" to="/admin">Admin</router-link>
      <router-link v-if="user" to="/customer/profile">My Profile</router-link>
      <router-link v-else to="/auth">Create an Account</router-link>
      <button v-if="user" class="logout-btn" @click="logout">Logout</button>
    </nav>

    <button class="menu-btn" @click="toggleMobileMenu">☰</button>
  </header>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const logout = () => {
  userStore.logout()
  router.push('/auth')
}
</script>

<style scoped>
:root {
  --bg-glass: rgba(255, 255, 255, 0.08);
  --text-light: #f1f1f1;
  --highlight: #cce3de;
  --accent: #a4c3b2;
  --dark-green: #2a3b36;
  --deep-green: #1e2b27;
  --shadow: rgba(0, 0, 0, 0.2);
}

.top-nav-bar {
  backdrop-filter: blur(10px);
  background-color: var(--bg-glass);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.4rem;
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 8px 30px var(--shadow);
}

.logo a {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo a:hover {
  color: var(--highlight);
}

nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

nav a,
nav button.logout-btn {
  font-size: 0.95rem;
  padding: 0.6rem 1.2rem;
  background: transparent;
  border: none;
  border-radius: 30px;
  color: var(--text-light);
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

nav a::after,
nav button.logout-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0%;
  height: 2px;
  background: var(--highlight);
  transition: width 0.3s ease, left 0.3s ease;
}

nav a:hover::after,
nav button.logout-btn:hover::after {
  width: 100%;
  left: 0;
}

nav a:hover,
nav button.logout-btn:hover {
  background-color: var(--deep-green);
  color: var(--highlight);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.08);
}

.menu-btn {
  display: none;
  font-size: 2rem;
  color: var(--text-light);
  background: none;
  border: none;
  cursor: pointer;
  z-index: 101;
  transition: transform 0.2s ease;
}

.menu-btn:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  nav {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 2rem;
    background-color: rgba(17, 27, 23, 0.98);
    box-shadow: 0 12px 24px var(--shadow);
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    animation: slideDown 0.3s ease forwards;
  }

  nav.open {
    display: flex;
  }

  .menu-btn {
    display: block;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>