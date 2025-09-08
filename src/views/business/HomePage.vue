<!-- src/pages/HomePage.vue -->
<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="hero">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1 class="title">FORMULÈ</h1>
        <p class="subtitle">
          Experience the depth of natural skincare with our premium formula.
        </p>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured">
      <h2>Featured Products</h2>
      <div class="product-grid">
        <ProductCard
          v-for="product in products.slice(0, 5)"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </section>

    <!-- About Us -->
    <section class="about">
      <h2>About Us</h2>
      <p>
        We believe in harnessing the power of nature to create skincare products
        that bring out your natural beauty. Our mission is to provide safe,
        sustainable, and effective solutions that nurture your skin and the
        planet.
      </p>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import productAPI from '@/api/business/productService.js'
import ProductCard from '@/components/business/ProductCard.vue'

const products = ref([])

onMounted(async () => {
  try {
    const data = await productAPI.getAll()
    products.value = data
  } catch (error) {
    console.error("❌ Failed to load products:", error)
  }
})

const loadProducts = async () => {
  try {
    const all = await productAPI.getAll()
    products.value = all.filter(p => p.name !== 'Test Product').slice(0, 5)
  } catch (error) {
    console.error('Failed to load products:', error)
  }
}

const handleAddToCart = (product) => {
  console.log('Adding to cart:', product)
  // TODO: connect to Pinia cart store or emit to global state
}
</script>

<style scoped>
.homepage {
  font-family: 'Poppins', sans-serif;
  color: #1a1a1a;
  overflow-x: hidden;
  transform: scale(0.90); 
}

:root {
  --cream: #dad7cd;
  --sage: #a3b18a;
  --olive: #588157;
  --forest: #3a5a40;
  --dark-green: #344e41;
}

/* Hero Section */
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 8%;
  min-height: 50vh;
  background: url("https://images.unsplash.com/photo-1587019152981-9d0c9b8d9d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80") center/cover no-repeat;
  border-radius: 0 0 40px 40px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(200, 255, 200, 0.6);
  border-radius: 0 0 40px 40px;
}

.hero-content {
  position: relative;
  text-align: center;
  z-index: 1;
  max-width: 700px;
}

.title {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #0a3d0a;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #333;
}

.featured {
  padding: 3rem 8%;
  background: #f5fff5;
  text-align: center;
}

.featured h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #0a3d0a;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

/* About Us */
.about {
  padding: 4rem 8%;
  text-align: center;
  background: #e8fce8;
  border-radius: 40px;
  margin: 2rem auto;
  max-width: 900px;
}

.about h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0a3d0a;
}

.about p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}
</style>
