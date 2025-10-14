<script setup lang="ts">
import TopNavBar from '@/components/generic/TopNavBar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'  

const route = useRoute()

const isAdminPage = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div class="layout">
    <TopNavBar v-if="!isAdminPage" />
    <router-view />
  </div>
</template>