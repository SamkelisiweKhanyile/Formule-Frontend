<template>
  <header class="top-nav-bar">
    <div class="logo">
      <router-link to="/">LOGO (Coming Soon)</router-link>
    </div>

    <nav :class="{ open: isMobileMenuOpen }">
      <router-link to="/">Home</router-link>
      <router-link to="/categories">Categories</router-link>
      <router-link to="/cart">Cart</router-link>
      <router-link to="/orders">Orders</router-link>
      <router-link v-if="user && user.role === 'admin'" to="/admin">Admin</router-link>
      <router-link v-if="user" to="/customer/profile">My Profile</router-link>
      <router-link v-if="!user" to="/auth">Login</router-link>
      <button v-if="user" class="logout-btn" @click="logout">Logout</button>
    </nav>

    <button class="menu-btn" @click="toggleMobileMenu">☰</button>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const user = computed(() => {
  return JSON.parse(localStorage.getItem('user'))
})

const logout = () => {
  localStorage.removeItem('user')
  router.push('/auth')
}
</script>

<style scoped>
:root {
  --cream: #dad7cd;
  --sage: #a3b18a;
  --olive: #588157;
  --forest: #3a5a40;
  --dark-green: #344e41;
}

.top-nav-bar {
  background-color: var(--forest);
  color: var(--cream);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 2rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  font-family: 'Helvetica Neue', sans-serif;
  position: relative;
  z-index: 20;
}

.logo a {
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Playfair Display', serif;
  color: var(--cream);
  text-decoration: none;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.logo a:hover {
  color: var(--sage);
}


nav {
  display: flex;
  gap: 1.8rem;
  align-items: center;
}

nav a,
nav button.logout-btn {
  color: var(--cream);
  background-color: transparent;
  border: none;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

nav a:hover,
nav button.logout-btn:hover {
  background-color: var(--sage);
  color: var(--dark-green);
  box-shadow: 0 4px 10px rgba(163, 177, 138, 0.3);
}


.menu-btn {
  display: none;
  font-size: 2rem;
  color: var(--cream);
  background: none;
  border: none;
  cursor: pointer;
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
    background-color: var(--dark-green);
    padding: 1rem 2rem;
    z-index: 10;
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.25);
    animation: fadeIn 0.3s ease-in-out;
  }

  nav.open {
    display: flex;
  }

  .menu-btn {
    display: block;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
