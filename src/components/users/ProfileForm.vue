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
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  font-weight: 500;
  color: var(--espresso);
  margin-bottom: 0.75rem;
}

input {
  padding: 1rem 1.25rem;
  border: 2px solid var(--mint);
  border-radius: 12px;
  font-size: 1.125rem;
  color: var(--espresso);
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: border 0.3s, box-shadow 0.3s ease;
}

input:focus {
  border-color: var(--olive);
  box-shadow: 0 0 5px var(--olive);
}

button {
  padding: 1.2rem;
  background-color: var(--olive);
  color: var(--cream);
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
}

button:hover {
  background-color: var(--taupe);
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}
</style>
