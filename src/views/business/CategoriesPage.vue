// Create heading "Shop By Category"
// & create buttons for different cartegories (Toners, Serums, etc)
// When a category is selected, display products in that category
// When a product is selected, redirect user to (ProductDetailsPage.vue) with the neccesarry data

<template>
  <div class="categories">
    <h3>Categories</h3>
    <ul>
      <li v-for="cat in categories" :key="cat.id">
        <router-link :to="{ name: 'Category', params: { id: cat.id } }">
          {{ cat.name }}
        </router-link>
      </li>
    </ul>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CategoryService from "@/api/business/CategoryService.js";

const categories = ref([]);

onMounted(() => {
  CategoryService.getAllCategories()
    .then(res => { categories.value = res.data })
    .catch(err => console.error("Error fetching categories:", err));
});
</script>

<style scoped>
.categories ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

.categories li a {
  text-decoration: none;
  color: #344e41;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.categories li a:hover {
  background-color: #a3b18a;
  color: #fff;
}
</style>
