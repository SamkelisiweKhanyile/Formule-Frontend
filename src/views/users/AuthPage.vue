<template>
  <div class="auth-container">
    <!-- Left Illustration -->
    <div class="auth-illustration">
      <div class="overlay-gradient"></div>
      <h1 class="illustration-title">Formulé</h1>
      <p class="illustration-tag">Elegance in Every Detail 🌿</p>
    </div>

    <!-- Right Form Panel -->
    <div class="auth-panel">
      <div class="form-wrapper">
        <!-- Logout Button -->
        <button v-if="userStore.user" @click="handleLogout" class="logout-btn">
          Logout
        </button>

        <h2 class="brand-title">{{ isLogin ? 'Welcome Back' : 'Create Your Account' }}</h2>
        <p class="tagline">
          {{ isLogin
            ? 'Log in to access your personalized experience.'
            : 'Join us and elevate your wellness journey.' }}
        </p>

        <!-- Tabs -->
        <div class="tabs" v-if="!userStore.user">
          <button :class="{ active: isLogin }" @click="isLogin = true">Login</button>
          <button :class="{ active: !isLogin }" @click="isLogin = false">Register</button>
        </div>

        <!-- Form -->
        <form v-if="!userStore.user" @submit.prevent="handleSubmit" class="auth-form">
          <!-- Registration fields -->
          <template v-if="!isLogin">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input id="firstName" v-model="form.firstName" type="text" required />
            </div>

            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input id="lastName" v-model="form.lastName" type="text" required />
            </div>

            <div class="form-group">
              <label for="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                v-model="form.phoneNumber"
                type="tel"
                required
                placeholder="e.g. 0123456789"
                pattern="[0-9]{10}"
                maxlength="10"
              />
            </div>
          </template>

          <div class="form-group">
            <label for="emailAddress">Email Address</label>
            <input id="emailAddress" v-model="form.emailAddress" type="email" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" v-model="form.password" type="password" required />
          </div>

          <!-- Confirm Password (only when registering) -->
          <template v-if="!isLogin">
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" v-model="form.confirmPassword" type="password" required />
            </div>
          </template>

          <button type="submit" class="auth-submit-btn">{{ isLogin ? 'Login' : 'Register' }}</button>
        </form>

        <!-- Success/Error Toast -->
        <transition name="fade">
          <div v-if="submitted" class="success-toast" aria-live="polite">
            {{ successMessage }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import customerAPI from '@/api/users/customerService.js';
import { useUserStore } from '@/store/userStore.js'; 

const isLogin = ref(true);
const submitted = ref(false);
const successMessage = ref('');
const router = useRouter();
const userStore = useUserStore(); 

const form = reactive({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  emailAddress: '',
  password: '',
  confirmPassword: ''
});

// Login / Registration
const handleSubmit = async () => {
  submitted.value = false;
  successMessage.value = '';

  try {
    if (isLogin.value) {
      // LOGIN
      const loggedInUser = await customerAPI.login(form.emailAddress, form.password);
      userStore.setUser(loggedInUser);
      successMessage.value = `Welcome back, ${loggedInUser.firstName || 'User'}!`;
      submitted.value = true;
      setTimeout(() => router.push('/'), 1200);
    } else {
      // REGISTRATION
      if (form.password !== form.confirmPassword) {
        successMessage.value = "Passwords do not match.";
        submitted.value = true;
        return;
      }

      const customerData = {
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        emailAddress: form.emailAddress,
        password: form.password
      };

      await customerAPI.create(customerData);

      successMessage.value = `Registration successful. Please log in using your email and password.`;
      submitted.value = true;

      // Reset form
      form.firstName = '';
      form.lastName = '';
      form.phoneNumber = '';
      form.emailAddress = '';
      form.password = '';
      form.confirmPassword = '';
      isLogin.value = true;
    }
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    successMessage.value = "An error occurred. Please try again.";
    submitted.value = true;
  }
};

// LOGOUT
const handleLogout = () => {
  userStore.logout();
  successMessage.value = "You have been logged out.";
  submitted.value = true;
  setTimeout(() => router.push('/login'), 1000);
};
</script>

<style scoped>
/* --- Keep your existing styles --- */
:root {
  --cream: #F0EAD2;
  --mint: #DDE5B6;
  --olive: #ADC178;
  --taupe: #A98467;
  --black: #000000;
}
.auth-container { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; font-family: 'Poppins', sans-serif; overflow: hidden; background: var(--cream); }
.auth-illustration { position: relative; background: url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80') center/cover; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 2rem; color: var(--black); }
.overlay-gradient { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(173,193,120,0.3)); }
.illustration-title { font-size: 3rem; font-weight: 900; margin:0; color: var(--black); }
.illustration-tag { font-size: 1rem; margin-top:0.5rem; color: var(--black); }
.auth-panel { display: flex; justify-content: center; align-items: center; }
.form-wrapper { width: 100%; max-width: 440px; background: white; padding: 1.5rem 2rem; border-radius: 20px; box-shadow: 0 12px 30px rgba(0,0,0,0.12); display: flex; flex-direction: column; }
.brand-title { font-size: 1.8rem; font-weight:700; margin-bottom:0.2rem; color: var(--black); }
.tagline { font-size:0.9rem; margin-bottom:1rem; color: var(--black); }
.tabs { display: flex; margin-bottom:1rem; border-radius:10px; overflow:hidden; }
.tabs button { flex:1; padding:0.5rem; font-size:0.85rem; border:none; background:#fafafa; cursor:pointer; transition: all 0.3s; }
.tabs button.active { background: var(--olive); color:white; }
.form-group { margin-bottom:0.7rem; display:flex; flex-direction:column; }
label { font-size:0.8rem; margin-bottom:0.2rem; }
input, select { padding:0.6rem; font-size:0.85rem; border-radius:6px; border:1px solid #ddd; }
.auth-submit-btn { padding:0.8rem; font-size:0.95rem; border-radius:10px; border:none; background: var(--olive); color:white; font-weight:600; cursor:pointer; transition: all 0.3s; }
.auth-submit-btn:hover { transform: translateY(-1px); }
.success-toast { position: fixed; bottom:1rem; right:1rem; padding:0.6rem 1.2rem; border-radius:10px; background: var(--mint); color: var(--black); font-weight:600; box-shadow:0 4px 12px rgba(0,0,0,0.1); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.logout-btn { background: #ff4d4f; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; cursor: pointer; margin-bottom: 1rem; }
.logout-btn:hover { background: #ff7875; }
@media (max-width: 900px) { .auth-container { grid-template-columns: 1fr; } .auth-illustration { display:none; } .auth-panel { padding:0; } .form-wrapper { padding:1rem; } }
</style>