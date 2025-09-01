<template>
  <div class="user-profile-page">
    <div v-if="loading">Loading profile...</div>
    <div v-else>
      <ProfileHeader
        :user="user"
        @update-profile="updateProfile"
        @delete-profile="deleteProfile"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import customerAPI from '@/api/users/customerService.js';
import ProfileHeader from '@/components/users/ProfileHeader.vue';

const router = useRouter();
const user = ref({});
const loading = ref(true);

const fetchUser = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/');
      return;
    }
    const data = await customerAPI.getById(userId);
    user.value = data;
  } catch (err) {
    console.error("Error fetching profile:", err);
  } finally {
    loading.value = false;
  }
};

const updateProfile = async (updatedUser) => {
  try {
    updatedUser.id = user.value.id; // ensure ID is included
    const updated = await customerAPI.update(user.value.id, updatedUser);
    user.value = updated;
    alert("Profile updated successfully!");
  } catch (err) {
    console.error("Error updating profile:", err);
    alert("Failed to update profile");
  }
};

const deleteProfile = async () => {
  const confirmed = confirm("Are you sure you want to delete your profile?");
  if (!confirmed) return;

  try {
    await customerAPI.delete(user.value.id);
    localStorage.removeItem('userId');
    alert("Profile deleted successfully!");
    router.push('/');
  } catch (err) {
    console.error("Error deleting profile:", err);
    alert("Failed to delete profile");
  }
};

onMounted(fetchUser);
</script>

<style scoped>
.user-profile-page {
  display: flex;
  justify-content: center;
  padding: 50px 20px;
  background-color: var(--cream);
  min-height: 100vh;
}
</style>
