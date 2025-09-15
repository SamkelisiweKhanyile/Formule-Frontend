<!-- src/pages/HomePage.vue -->
<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Exclusive International Skincare in South Africa</h1>
        <div class="hero-buttons">
          <router-link to="/about" class="btn dark">About Us</router-link>
          <router-link to="/categories" class="btn light">Shop Now</router-link>
        </div>
      </div>
      <div class="hero-image">
        <img
          src="https://www.gje.com/wp-content/uploads/2022/06/shutterstock_1055571677-scaled.jpg"
          alt="Skincare Products"
        />
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured">
      <h2>Featured Products</h2>
      <div class="product-grid">
        <ProductCard
          v-for="product in products.slice(1, 11)"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2025 FÓRMULĒ. All rights reserved.</p>
      <div class="footer-links">
        <router-link to="/privacy">Privacy Policy</router-link>
        <router-link to="/terms">Terms & Conditions</router-link>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/store/userStore.js';
import productAPI from '@/api/business/ProductService.js';
import cartAPI from '@/api/business/CartService.js';
import ProductCard from '@/components/business/ProductCard.vue';

const products = ref([]);
const userStore = useUserStore();

onMounted(async () => {
  try {
    const data = await productAPI.getAll();
    products.value = data;
  } catch (error) {
    console.error('❌ Failed to load products:', error);
  }
});

const handleAddToCart = async (product) => {
  if (!userStore.user?.id) {
    alert("Please log in to add items to cart.");
    return;
  }

  try {
    // Add 1 quantity of this product to cart
    await cartAPI.addToCart(
      userStore.user.id, // customerId
      product.id,        // productId
      1                  // quantity
    );

    alert(`${product.name} added to cart!`);
  } catch (error) {
    console.error("Failed to add to cart:", error);
    alert("Failed to add item to cart. Please try again.");
  }
};
</script>

<style scoped>
/* General */
.home {
  font-family: 'Poppins', sans-serif;
  color: #333;
}

/* Hero Section */
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fdfdfd;
  padding: 4rem 6rem;
  border-radius: 0 0 40px 40px;
  min-height: 200px;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 50%;
}

.hero-content h1 {
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: black;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  box-shadow: none;
}

/* Buttons */
.btn {
  padding: 0.8rem 1.8rem;
  border-radius: 30px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn.dark {
  background: #000;
  color: #fff;
}

.btn.light {
  background: #fff;
  color: #000;
  border: 1px solid #ccc;
}

.btn:hover {
  transform: translateY(-3px);
}

/* Featured Section */
.featured {
  padding: 4rem 6rem;
  text-align: center;
  background: beige;
}

.featured h2 {
  font-size: 2rem;
  margin-bottom: 2.5rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2rem;
  justify-items: center;
}

/* Footer */
.footer {
  background: rgb(28, 75, 28);
  text-align: center;
  padding: 1.5rem 0;
  margin-top: auto;
}

.footer p {
  margin-bottom: 0.5rem;
  color: black;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.footer-links a {
  text-decoration: none;
  color: black;
  font-size: 0.9rem;
}

.footer-links a:hover {
  color: yellowgreen;
}
</style>