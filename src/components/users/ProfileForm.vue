<template>
  <form @submit.prevent="submitForm" class="profile-form">
    <div class="form-group">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model="customer.firstName" required />
    </div>

    <div class="form-group">
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="customer.lastName" required />
    </div>

    <div class="form-group">
      <label for="phone">Phone Number</label>
      <input type="tel" id="phone" v-model="customer.phone" required />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="customer.email" required />
    </div>

    <div class="form-group">
      <label for="password">New Password</label>
      <input type="password" id="password" v-model="customer.password" placeholder="Leave blank to keep current" />
    </div>

    <button type="submit">{{ isEditing ? 'Update Profile' : 'Create Profile' }}</button>
  </form>
</template>

<script>
export default {
  name: 'ProfileForm',
  props: {
    customer: Object,
    isEditing: Boolean
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.customer);
    }
  }
};
</script>
<style scoped>
:root {
  --cream: #dad7cd;
  --sage: #a3b18a;
  --olive: #588157;
  --forest: #3a5a40;
  --dark-green: #344e41;
}

/* Form Layout */
.profile-form {
  background-color: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 14px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  max-width: 700px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transform: scale(0.95); /* Zoom out */
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* Group spacing */
.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--dark-green);
  margin-bottom: 0.4rem;
}

/* Input Fields */
input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--sage);
  border-radius: 10px;
  font-size: 0.95rem;
  color: #333;
  background-color: #fefefc;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: var(--olive);
  outline: none;
  box-shadow: 0 0 0 3px rgba(88, 129, 87, 0.2);
}

/* Submit Button */
button {
  align-self: flex-end;
  padding: 0.75rem 1.5rem;
  background-color: var(--olive);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.15s ease;
  box-shadow: 0 6px 18px rgba(88, 129, 87, 0.15);
}

button:hover {
  background-color: var(--forest);
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}
</style>
