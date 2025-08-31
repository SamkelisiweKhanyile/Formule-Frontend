<template>
  <div class="profile-card">
    <img :src="user.profilePicture || 'https://via.placeholder.com/150'" alt="Profile Picture" class="profile-pic" />

    <input v-model="editedUser.firstName" placeholder="First Name" class="profile-input" />
    <input v-model="editedUser.lastName" placeholder="Last Name" class="profile-input" />
    <input v-model="editedUser.phoneNumber" placeholder="Phone Number" class="profile-input" />
    <input v-model="editedUser.emailAddress" placeholder="Email" class="profile-input" />
    <input v-model="editedUser.password" type="password" placeholder="New Password" class="profile-input" />
    <input v-model="confirmPassword" type="password" placeholder="Confirm New Password" class="profile-input" />
    <div class="profile-actions">
      <button @click="$emit('update-profile', editedUser)">Save Changes</button>
      <button class="delete-btn" @click="$emit('delete-profile')">Delete Profile</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
const props = defineProps({ user: Object });
const editedUser = reactive({ ...props.user });
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      Object.assign(editedUser, newUser); 
    }
  },
  { immediate: true } 
);

</script>

<style scoped>
.profile-card {
  background: var(--mint);
  border-radius: 20px;
  padding: 30px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--olive);
}

.profile-input {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--taupe);
}

.profile-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
}

button {
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

button:hover { opacity: 0.9; }

.delete-btn {
  background: var(--taupe);
  color: var(--cream);
}
</style>
