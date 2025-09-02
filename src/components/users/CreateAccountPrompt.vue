<template>
  <div class="overlay" @click.self="emitClose">
    <div class="modal">
      <h2>Create Your Formule Account</h2>
      <p>Join our skincare community to get personalized product recommendations, early access to launches, and exclusive offers.</p>

      <form @submit.prevent="handleSubmit">
        <input type="email" v-model="email" placeholder="Email address" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Create Account</button>
      </form>

      <p class="disclaimer">Already have an account? <a href="#login">Log in</a></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['close', 'create']);
const email = ref('');
const password = ref('');

function handleSubmit() {
  emit('create', { email: email.value, password: password.value });
  Optional: clear fields or close modal
}
function emitClose() {
  emit('close');
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(108, 88, 76, 0.3); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal {
  background: var(--cream);
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  color: var(--espresso);
  text-align: center;
}

h2 {
  margin-bottom: 0.5rem;
  color: var(--taupe);
  font-size: 1.5rem;
}

p {
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  color: var(--espresso);
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.75rem;
  border: 1px solid var(--mint);
  border-radius: 8px;
  font-size: 0.95rem;
  background-color: #fff;
}

input:focus {
  outline: none;
  border-color: var(--olive);
}

button {
  background-color: var(--olive);
  color: #fff;
  font-weight: bold;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--taupe);
}

.disclaimer {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--espresso);
}

.disclaimer a {
  color: var(--olive);
  text-decoration: none;
}

.disclaimer a:hover {
  text-decoration: underline;
}
</style>
