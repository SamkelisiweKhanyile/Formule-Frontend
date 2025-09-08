<template>
  <div class="profile-card">
    <img
      :src="user.profilePicture || 'https://via.placeholder.com/150'"
      alt="Profile Picture"
      class="profile-pic"
    />

    <input v-model="editedUser.firstName" placeholder="First Name" class="profile-input" />
    <input v-model="editedUser.lastName" placeholder="Last Name" class="profile-input" />
    <input v-model="editedUser.phoneNumber" placeholder="Phone Number" class="profile-input" />
    <input v-model="editedUser.emailAddress" placeholder="Email" class="profile-input" />
    <input
      v-model="editedUser.password"
      type="password"
      placeholder="New Password"
      class="profile-input"
      autocomplete="new-password"
    />
    <input
      v-model="confirmPassword"
      type="password"
      placeholder="Confirm New Password"
      class="profile-input"
      autocomplete="new-password"
    />

    <div class="profile-actions">
      <button @click="handleSave">Save Changes</button>
      <button class="delete-btn" @click="$emit('delete-profile')">Delete Profile</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update-profile', 'delete-profile']);

const editedUser = reactive({ ...props.user });
const confirmPassword = ref('');

// Sync changes if prop user updates externally
watch(
  () => props.user,
  (newUser) => {
    if (newUser) Object.assign(editedUser, newUser);
  },
  { immediate: true }
);

const handleSave = () => {
  if (editedUser.password && editedUser.password !== confirmPassword.value) {
    alert("❌ Passwords don't match!");
    return;
  }
  emit('update-profile', editedUser);
};
</script>

<style scoped>
:root {
  --mint: #a8d5ba;
  --olive: #556b2f;
  --taupe: #483c32;
  --cream: #f9f6f0;
}

.profile-card {
  background: var(--mint);
  border-radius: 20px;
  padding: 30px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--olive);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.profile-input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1.8px solid var(--taupe);
  font-size: 15px;
  transition: border-color 0.3s ease;
}

.profile-input:focus {
  outline: none;
  border-color: var(--olive);
  box-shadow: 0 0 8px var(--olive);
  background-color: #f0f7ee;
}

.profile-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

button {
  flex: 1;
  padding: 12px 20px;
  margin: 0 8px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  background-color: var(--olive);
  color: var(--cream);
  transition: background-color 0.25s ease;
}

button:hover {
  background-color: #3e521f;
}

.delete-btn {
  background: var(--taupe);
  color: var(--cream);
  transition: background-color 0.25s ease;
}

.delete-btn:hover {
  background-color: #392f26;
}
</style>
