// Create heading "Shop By Category"
// & create buttons for different cartegories (Toners, Serums, etc)
// When a category is selected, display products in that category
// When a product is selected, redirect user to (ProductDetailsPage.vue) with the neccesarry data

<template>
  <div class="categories">
    <h3>Shop By Category</h3>

    <!-- Category Buttons -->
    <ul class="category-buttons">
      <!-- "All" button -->
      <li>
        <button
          :class="{ active: !selectedCategory }"
          @click="selectCategory(null)"
        >
          All
        </button>
      </li>

      <!-- Dynamic categories -->
      <li v-for="cat in categories" :key="cat.id">
        <button
          :class="{ active: selectedCategory === cat.id }"
          @click="selectCategory(cat.id)"
        >
          {{ cat.name }}
        </button>
      </li>
    </ul>

    <!-- Products Grid -->
    <div class="product-grid">
      <router-link
        v-for="product in filteredProducts"
        :key="product.id"
        :to="{ name: 'productDetails', params: { id: product.id } }"
        style="text-decoration: none; color: inherit;"
      >
        <ProductCard :product="product" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CategoryService from "@/api/business/CategoryService.js";
import productAPI from "@/api/business/ProductService.js";
import ProductCard from "@/components/business/ProductCard.vue";

const categories = ref([]);
const products = ref([]);
const selectedCategory = ref(null);

const router = useRouter();

// Fetch categories on mount
onMounted(async () => {
  try {
    const res = await CategoryService.getAllCategories();
    categories.value = res.data || res;
    loadProducts();
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
});

// Select category function
const selectCategory = async (id) => {
  selectedCategory.value = id;
  // Optionally update the route
  if (id) {
    router.push({ name: "Category", params: { id } });
  } else {
    router.push({ name: "Categories" });
  }
  await loadProducts();
};

// Load products based on selected category
const loadProducts = async () => {
  try {
    if (selectedCategory.value) {
      const res = await productAPI.getProductsByCategory(selectedCategory.value);
      products.value = res.data || res;
    } else {
      const res = await productAPI.getAll();
      products.value = res.data || res;
    }
  } catch (error) {
    console.error("❌ Failed to load products:", error);
  }
};

const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    return products.value;
  }
  return products.value.filter(p => p.categoryId === selectedCategory.value);
});
</script>

<style scoped>
.categories {
  padding: 1rem;
}

h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #344e41;
}

.category-buttons {
  list-style: none;
  display: flex;
  gap: 0.8rem;
  padding: 0;
  margin-bottom: 2rem;
}

.category-buttons li button {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #e5e5e5;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.category-buttons li button:hover {
  background-color: #a3b18a;
  color: #fff;
}

.category-buttons li button.active {
  background-color: #344e41;
  color: #fff;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}
</style>
