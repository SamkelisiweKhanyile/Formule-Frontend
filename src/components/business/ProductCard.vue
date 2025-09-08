<!-- src/components/products/ProductCard.vue -->
<template>
  <div class="product-card">
    <img :src="getImageUrl(product.image_url)" alt="Product image" class="product-img" />
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="brand">{{ product.brand }}</p>
      <p class="price">R{{ product.price }}</p>

      <div class="button-group">
        <router-link :to="`/products/${product.id}`" class="view-btn">View Product</router-link>
        <button class="cart-btn" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Emit the event so parent can handle the cart logic
const emit = defineEmits(['add-to-cart'])

const addToCart = () => {
  emit('add-to-cart', props.product)
}

const fallbackImage = 'https://via.placeholder.com/300x300.png?text=No+Image'

// Converts Dropbox share URLs to direct URLs
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


.product-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 1rem;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-img {
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 10px;
}

.product-info h3 {
  font-size: 1.2rem;
  margin: 0.6rem 0 0.2rem;
  color: #333;
}

.brand {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
}

.price {
  color: #0a3d0a;
  font-weight: bold;
  margin-bottom: 0.6rem;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.view-btn{
 color: #3a5a40;
}
.cart-btn {
  background: #0a3d0a;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.85rem;
  transition: background 0.2s ease;
  border: none;
  cursor: pointer;
  width: 100%;
  max-width: 140px;
}

.view-btn:hover{
 color: #116611;
}
.cart-btn:hover {
  background: #116611;
}
</style>
