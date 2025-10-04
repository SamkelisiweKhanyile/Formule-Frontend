import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/main.css'; // Your global CSS

// 1. Create the app
const app = createApp(App);

// 2. Create and use Pinia
const pinia = createPinia();
app.use(pinia);

// 3. Use router
app.use(router);

// ✅ 4. Initialize the user store to persist user from localStorage
import { useUserStore } from '@/store/userStore';
const userStore = useUserStore(pinia); // Pass pinia instance!
userStore.initialize();

// 5. Mount the app
app.mount('#app');
