<template>
  <div class="product-card">
    <img :src="imageSrc" :alt="product.name" class="product-image" @error="handleImageError" />
    <h2>{{ product.name }}</h2>
    <p class="description">{{ product.description }}</p>
    <p class="price">${{ product.price.toFixed(2) }}</p>
    <p class="quantity">In Stock: {{ product.quantity }}</p>
    <p class="category">Category ID: {{ product.categoryId }}</p>
    <p class="brand">Brand: {{ brandDisplayName }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imageError: false
    }
  },
  computed: {
    imageSrc() {
      if (this.imageError) {
        return new URL('../assets/Innisfree.jpg', import.meta.url).href
      }
      return new URL(`../assets/product-image-${this.product.id}.jpg`, import.meta.url).href
    },
    brandDisplayName() {
      return typeof this.product.brand === 'string' ? this.product.brand : this.product.brand?.displayName || 'Unknown'
    }
  },
  methods: {
    handleImageError() {
      this.imageError = true
    }
  }
}
</script>

<style scoped>
.product-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}
.product-card:hover {
  transform: translateY(-5px);
}
.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}
h2 {
  font-size: 1.2em;
  margin: 10px 0;
  color: #333;
}
.description {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 10px;
}
.price {
  font-weight: bold;
  color: #2ecc71;
}
.quantity, .category, .brand {
  font-size: 0.85em;
  color: #888;
  margin: 5px 0;
}
</style>