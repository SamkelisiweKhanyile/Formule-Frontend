
<template>
  <div class="cart-page">
    <h1>Your Shopping Cart</h1>
    <Cart v-if="customerId" :customer-id="customerId" />
    <div v-else class="login-prompt">
      <p>Please log in to view your cart.</p>
      <router-link to="/auth" class="login-link">Go to Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/userStore.js';
import Cart from '@/components/business/Cart.vue';

const userStore = useUserStore();
const customerId = userStore.user?.id;
</script>

<style scoped>
.cart-page {
  padding: 2rem 8%;
  background: #f5fff5;
  min-height: 80vh;
}

.cart-page h1 {
  text-align: center;
  color: #0a3d0a;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.login-prompt {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.login-link {
  display: inline-block;
  margin-top: 1rem;
  color: #0a3d0a;
  text-decoration: underline;
  font-weight: 500;
}
</style>