<template>
  <div class="category-page">
    <h2>Categories</h2>

    <!-- Category buttons -->
    <div class="categories">
      <button
        v-for="cat in categories"
        :key="cat.id"
        :class="{ active: cat.id === selectedCategoryId }"
        @click="fetchProducts(cat.id)"
      >
        {{ cat.name }}
      </button>
    </div>

    <h3>Products</h3>
    <div class="products">
      <div v-for="prod in products" :key="prod.id" class="product-card">
        <!-- Display image using mapped field -->
        <img
          :src="getImageUrl(prod.imageUrl)"
          :alt="prod.name"
          class="product-img"
        />
        <h4>{{ prod.name }}</h4>
        <p>{{ prod.description }}</p>
        <p>Price: R{{ prod.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CategoryAPI from '@/api/business/categoryService'

const categories = ref([])
const products = ref([])
const selectedCategoryId = ref(null)

// Use same logic as your product-card
const fallbackImage = 'https://placehold.co/300x300?text=No+Image'

function getImageUrl(url) {
  if (!url) return fallbackImage
  if (url.includes('dropbox.com')) {
    return url
      .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
      .replace('?dl=0', '')
  }
  return url
}

const fetchCategories = async () => {
  try {
    const response = await CategoryAPI.getAllCategories()
    categories.value = response.data
    if (categories.value.length > 0) {
      fetchProducts(categories.value[0].id)
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const fetchProducts = async (categoryId) => {
  try {
    selectedCategoryId.value = categoryId
    const response = await CategoryAPI.getProductsByCategory(categoryId)

    // ✅ Map backend field to imageUrl for frontend
    products.value = response.data.map(prod => ({
      ...prod,
      imageUrl: prod.imageUrl || prod.image_url || '' // map actual backend field
    }))

    console.log('Products mapped:', products.value)
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

onMounted(fetchCategories)
</script>

<style scoped>
.category-page {
  padding: 1rem;
  background: #111;
  color: white;
}

.categories {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.categories button {
  padding: 0.5rem 1rem;
  border: none;
  background: #333;
  color: white;
  cursor: pointer;
  border-radius: 6px;
}

.categories button.active {
  background: dodgerblue;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.product-card {
  background: #222;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.product-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border-radius: 6px;
}
</style>
