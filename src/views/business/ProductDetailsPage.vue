// Details of the chosen product
// Display image, name, description & price
// Optional (Alloe user to select quantity)
// Add an "add to cart" button (it should carry the necessary details of the product to be sent to CART)

<template>
  <div class="product-details">
    <div v-if="product" class="product-container">
      <img :src="getImageUrl(product.image_url)" alt="Product image" class="product-img">
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="brand">{{ product.brand }}</p>
        <p class="price">R{{ product.price }}</p>
        <p class="description">{{ product.description || 'No description available.' }}</p>
        <!-- Add more details as available from the backend, e.g., ingredients, size, etc. -->
        <div class="button-group">
          <button class="cart-btn" @click="addToCart">Add to Cart</button>
          <router-link to="/categories" class="return-btn">Return to Categories</router-link>
        </div>
      </div>
    </div>
    <div v-else="">
      <p>Loading product details...</p>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import productAPI from '@/api/business/ProductService.js'

const route = useRoute()
const product = ref(null)

onMounted(async () => {
  const productId = route.params.id
  try {
    const data = await productAPI.getById(productId) 
    product.value = data
  } catch (error) {
    console.error('❌ Failed to load product details:', error)
  }
})

const addToCart = (product) => {
  console.log('Adding to cart:', product)
  // TODO: connect to Pinia cart store or global state
}

const fallbackImage = 'https://via.placeholder.com/300x300.png?text=No+Image'

function getImageUrl(url) {
  if (!url) return fallbackImage
  try {
    if (url.includes('dropbox.com')) {
      return url
        .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
        .replace('?dl=0', '')
    }
    return url
  } catch (err) {
    return fallbackImage
  }
}
</script>
<style scoped>
.product-details {
  padding: 4rem 6rem;
  background: #fff;
  font-family: 'Poppins', sans-serif;
}

.product-container {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-img {
  width: 50%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 10px;
}

.product-info {
  width: 50%;
}

.product-info h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.brand {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.price {
  color: #0a3d0a;
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  gap: 1rem;
}

.cart-btn {
  background: #0a3d0a;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  transition: background 0.2s ease;
  border: none;
  cursor: pointer;
}

.cart-btn:hover {
  background: #116611;
}

.return-btn {
  background: #0a3d0a;
  color: white;
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  transition: background 0.2s ease;
  border: none;
  cursor: pointer;
  margin-top: 0.3rem;
  display: inline-block;
}

.return-btn:hover {
  background: #cce3cc;
  color: #116611;
}
</style>