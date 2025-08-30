<template>
  <div class="auth-wrapper">
    <div class="auth-box">
      <h1 class="logo">Formul<span class="accent">é</span></h1>

      <div class="tabs">
        <button :class="{ active: isLogin }" @click="isLogin = true">Login</button>
        <button :class="{ active: !isLogin }" @click="isLogin = false">Register</button>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input v-model="form.password" type="password" required />
        </div>

        <template v-if="!isLogin">
          <div class="form-group">
            <label>Full Name</label>
            <input v-model="form.fullName" type="text" required />
          </div>

          <div class="form-group">
            <label>Role</label>
            <select v-model="form.role" required>
              <option disabled value="">Select role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </template>

        <button type="submit" class="submit-btn">{{ isLogin ? 'Login' : 'Register' }}</button>
      </form>

      <div v-if="submitted" class="success-msg">
        {{ isLogin ? 'Welcome back to Formulé ✨' : `Thank you for joining, ${form.role === 'admin' ? 'Admin' : 'Beautiful You'}!` }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const isLogin = ref(true)
const submitted = ref(false)
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  fullName: '',
  role: ''
})

const handleSubmit = () => {
  submitted.value = true

  const userData = {
    email: form.email,
    role: isLogin.value ? 'customer' : form.role
  }

  localStorage.setItem('user', JSON.stringify(userData))

  setTimeout(() => {
    if (userData.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/')
    }
  }, 1000)
}
</script>

<style scoped>
/* Brand colors */
:root {
  --cream: #F0EAD2;
  --mint: #DDE5B6;
  --olive: #ADC178;
  --taupe: #A98467;
  --espresso: #6C584C;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--cream);
  font-family: 'Segoe UI', sans-serif;
}

.auth-box {
  background-color: white;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 420px;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 2px solid var(--mint);
  text-align: center;
}

.logo {
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--espresso);
  letter-spacing: 1px;
}

.logo .accent {
  color: var(--olive);
  font-style: italic;
}

.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.tabs button {
  flex: 1;
  padding: 0.7rem;
  font-size: 1rem;
  border: none;
  background-color: var(--mint);
  color: var(--espresso);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.tabs button.active {
  background-color: var(--olive);
  color: white;
}

.auth-form {
  text-align: left;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: var(--espresso);
}

input,
select {
  width: 100%;
  padding: 0.65rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fafafa;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--olive);
  background-color: white;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--olive);
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background-color: #94a662;
}

.success-msg {
  margin-top: 1.5rem;
  font-weight: 600;
  color: var(--taupe);
}
</style>
