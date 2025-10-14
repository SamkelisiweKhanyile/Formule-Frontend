// Create heading "Shop By Category"
// & create buttons for different cartegories (Toners, Serums, etc)
// When a category is selected, display products in that category
// When a product is selected, redirect user to (ProductDetailsPage.vue) with the neccesarry data

<template>
  <div class="category-page">
    <h2>Shop by Categories</h2>

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
          @error="prod.imageUrl = fallbackImage"
        />
        <div class="product-info">
          <h4 class="product-name">{{ prod.name }}</h4>
          <p class="product-brand" v-if="prod.brand">Brand: {{ prod.brand }}</p>
          <p class="product-price">Price: <strong>R{{ prod.price }}</strong></p>
        </div>
        <button class="add-to-cart-btn" @click="addToCart(prod)">
          Add to Cart 
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CategoryAPI from '@/api/customer/categoryService'

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
      imageUrl: prod.imageUrl || prod.image_url || '', // map actual backend field
      brand: prod.brand || 'Unknown Brand' // fallback for brand
    }))

    console.log('Products mapped:', products.value)
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

// 🛒 Add to Cart Function (placeholder — integrate with your cart store later)
const addToCart = (product) => {
  console.log('Added to cart:', product)
  // Example: cartStore.addToCart(product)
  alert(`${product.name} added to cart!`)
}

onMounted(fetchCategories)
</script>

<style scoped>
.category-page {
  padding: 2rem;
  background: #eaebca;
  color: white;
  min-height: 100vh;
}

.category-page h2,
.category-page h3 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #a3b18a;
}

.categories {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.categories button {
  padding: 0.6rem 1.2rem;
  border: none;
  background: #54d127;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.categories button:hover {
  background: #444;
}

.categories button.active {
  background: #63a753;
  box-shadow: 0 0 8px rgba(89, 142, 66, 0.5);
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.product-card {
  background: #fbfbfb;
  padding: 1.25rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.product-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 8px;
  background: #333;
}

.product-info {
  text-align: left;
  margin-bottom: 1rem;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: #838f55;
}

.product-brand {
  font-size: 0.9rem;
  color: #a3b18a;
  margin: 0.25rem 0;
}

.product-price {
  font-size: 1.1rem;
  color: #f4a261;
  margin: 0.5rem 0;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.75rem;
  background: #114a22;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-to-cart-btn:hover {
  background: #66d558;
}

.add-to-cart-btn:active {
  transform: scale(0.98);
}
</style>
