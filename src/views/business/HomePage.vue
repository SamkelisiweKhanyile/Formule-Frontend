<!-- src/pages/HomePage.vue -->
<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Exclusive International Skincare in South Africa</h1>
        <p class="hero-subtitle">Elevate your beauty ritual with luxury products crafted for your glow.</p>
        <div class="hero-buttons">
          <router-link to="/about" class="btn btn-gradient-dark">About Us</router-link>
          <router-link to="/categories" class="btn btn-gradient-light">Shop Now</router-link>
        </div>
      </div>
      <div class="hero-image" aria-hidden="true">
        <img
          src="https://www.gje.com/wp-content/uploads/2022/06/shutterstock_1055571677-scaled.jpg"
          alt="Luxury Skincare Products"
          loading="lazy"
        />
        <div class="image-overlay"></div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <h2>What Our Customers Say</h2>
      <div class="testimonial-cards">
        <blockquote>
          <p>“Formulé changed my skincare routine completely. My skin has never felt this radiant!”</p>
          <footer>— Sarah M.</footer>
        </blockquote>
        <blockquote>
          <p>“Quality products with a touch of elegance. Highly recommend to anyone looking for luxury skincare.”</p>
          <footer>— Thabo D.</footer>
        </blockquote>
        <blockquote>
          <p>“Fast delivery and amazing customer support. I’m obsessed with the moisturizing line!”</p>
          <footer>— Lindiwe K.</footer>
        </blockquote>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured">
      <h2>Featured Products</h2>
      <div class="product-grid">
        <ProductCard
          v-for="product in products.slice(0, 8)"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="newsletter">
      <h2>Join Our Wellness Community</h2>
      <p>Subscribe to receive exclusive offers, beauty tips, and the latest product launches.</p>
      <form @submit.prevent="handleSubscribe" class="newsletter-form">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email address"
          required
          aria-label="Email address"
        />
        <button type="submit" class="btn btn-subscribe">Subscribe</button>
      </form>
      <p v-if="subscribeMessage" class="subscribe-message">{{ subscribeMessage }}</p>
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
import productAPI from '@/api/business/productService.js';
import cartAPI from '@/api/business/cartService.js';
import ProductCard from '@/components/business/ProductCard.vue';

const products = ref([]);
const userStore = useUserStore();
const email = ref('');
const subscribeMessage = ref('');

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
    await cartAPI.addToCart(userStore.user.id, product.id, 1);
    alert(`${product.name} added to cart!`);
  } catch (error) {
    console.error("Failed to add to cart:", error);
    alert("Failed to add item to cart. Please try again.");
  }
};

const handleSubscribe = () => {
  // Dummy subscription logic (replace with real API call)
  subscribeMessage.value = `Thanks for subscribing, we'll keep you glowing! ✨`;
  email.value = '';
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');

.home {
  font-family: 'Poppins', sans-serif;
  color: #2d2d2d;
  background: #fffefa;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

}

/* Hero Section */
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 6rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #c1d7ae, #f7f3e8);
  border-radius: 0 0 4rem 4rem; 
}

.hero-content {
  max-width: 45%;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
  color: #30491e;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hero-subtitle {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 2.5rem;
  color: #556b2f;
  opacity: 0.85;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
}

.btn {
  border-radius: 50px;
  font-weight: 600;
  padding: 0.85rem 2.5rem;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 5px 15px rgba(61,94,34,0.25);
  transition: all 0.3s ease;
  user-select: none;
}

.btn-gradient-dark {
  background: linear-gradient(135deg, #30491e, #556b2f);
  color: #fff;
  border: none;
}

.btn-gradient-dark:hover {
  background: linear-gradient(135deg, #556b2f, #30491e);
  box-shadow: 0 8px 20px rgba(85,107,47,0.5);
  transform: translateY(-4px);
}

.btn-gradient-light {
  background: #fff;
  color: #30491e;
  border: 2px solid #30491e;
}

.btn-gradient-light:hover {
  background: #556b2f;
  color: #fff;
  border-color: #556b2f;
  box-shadow: 0 8px 20px rgba(85,107,47,0.3);
  transform: translateY(-4px);
}

.hero-image {
  flex: 1;
  position: relative;
  height: 420px;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(61,94,34,0.2);
  z-index: 1;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9);
  transition: transform 0.5s ease;
  border-radius: 2rem;
}

.hero-image:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(85,107,47,0.25), rgba(255,255,255,0.1));
  pointer-events: none;
}

/* Testimonials */
.testimonials {
  padding: 4rem 6rem;
  background: #f5f7ed;
  text-align: center;
}

.testimonials h2 {
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  color: #30491e;
}

.testimonial-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.testimonial-cards blockquote {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  max-width: 320px;
  font-style: italic;
  color: #556b2f;
  position: relative;
  transition: transform 0.3s ease;
}

.testimonial-cards blockquote:hover {
  transform: translateY(-6px);
}

.testimonial-cards blockquote p {
  margin-bottom: 1.25rem;
  font-size: 1.1rem;
  line-height: 1.5;
}

.testimonial-cards blockquote footer {
  font-weight: 600;
  font-size: 1rem;
  color: #30491e;
  text-align: right;
}

/* Featured Products */
.featured {
  padding: 4rem 6rem;
  text-align: center;
}

.featured h2 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #30491e;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(260px, 1fr));
  gap: 2.5rem;
  justify-items: center;
}

/* Newsletter */
.newsletter {
  background: #30491e;
  color: #fff;
  text-align: center;
  padding: 3.5rem 2rem;
  margin: 4rem 6rem;
  border-radius: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.newsletter h2 {
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.newsletter p {
  font-weight: 400;
  margin-bottom: 2.5rem;
  opacity: 0.85;
}

.newsletter-form {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.newsletter-form input {
  padding: 0.85rem 1.5rem;
  border-radius: 50px;
  border: none;
  font-size: 1rem;
  width: 280px;
  max-width: 100%;
  outline: none;
}

.newsletter-form button {
  background: #f7f3e8;
  color: #30491e;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  padding: 0.85rem 2.5rem;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(247,243,232,0.6);
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  background: #fff;
  box-shadow: 0 10px 30px rgba(247,243,232,0.9);
  transform: translateY(-3px);
}

.subscribe-message {
  margin-top: 1rem;
  font-style: italic;
  color: #d4e157;
  font-weight: 600;
}

/* Footer */
.footer {
  background: #1c4b1c;
  text-align: center;
  padding: 1.5rem 0;
  margin-top: auto;
  color: #d4e157;
  font-weight: 500;
}

.footer-links {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.footer-links a {
  text-decoration: none;
  color: #d4e157;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #fff;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 1200px) {
  .hero {
    flex-direction: column;
    padding: 3rem 2rem;
    border-radius: 0 0 3rem 3rem;
  }
  .hero-content {
    max-width: 100%;
    margin-bottom: 2rem;
    text-align: center;
  }
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-subtitle {
    font-size: 1.1rem;
  }
  .hero-image {
    height: 300px;
    width: 90vw;
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  .testimonial-cards {
    flex-direction: column;
    gap: 1.8rem;
  }
  .newsletter {
    margin: 3rem 1rem;
    padding: 3rem 1.5rem;
  }
  .newsletter-form {
    flex-direction: column;
  }
  .newsletter-form input,
  .newsletter-form button {
    width: 100%;
  }
}
</style>
