<template>
  <div class="cart-container">
    
    <!-- Left Side Illustration -->
    <div class="cart-illustration">
      <div class="overlay-gradient"></div>
      <h1 class="illustration-title">Formulé</h1>
      <p class="illustration-tag">Your Cart Awaits 🛒</p>
    </div>

    <!-- Right Side Cart Panel -->
    <div class="cart-panel">
      <div class="form-wrapper">
        <h2 class="brand-title">Your Cart</h2>
        <p class="tagline">Review items before checkout.</p>

        <!-- Cart Items Table -->
        <div class="cart-items" v-if="cartItems.length > 0">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cartItems" :key="index">
                <td>{{ item.name }}</td>
                <td>
                  <input 
                    type="number" 
                    min="1" 
                    v-model.number="item.quantity" 
                    @change="updateQuantity(index, item.quantity)" 
                  />
                </td>
                <td>R{{ item.price.toFixed(2) }}</td>
                <td>R{{ (item.price * item.quantity).toFixed(2) }}</td>
                <td>
                  <button class="remove-btn" @click="removeItem(index)">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Cart Summary -->
          <div class="cart-summary">
            <h3>Total: R{{ cartTotal.toFixed(2) }}</h3>
            <button class="submit-btn" @click="proceedToCheckout">Proceed to Checkout</button>
          </div>
        </div>

        <!-- Empty Cart Message -->
        <div v-else class="empty-cart">
          <p>Your cart is currently empty 🛍</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Example Cart Items
const cartItems = reactive([
  { name: "Glow Serum", price: 250, quantity: 2 },
  { name: "Herbal Face Mask", price: 150, quantity: 1 },
  { name: "Organic Soap", price: 80, quantity: 3 },
]);

// Calculate Cart Total
const cartTotal = computed(() => {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

// Update Item Quantity
function updateQuantity(index, quantity) {
  if (quantity < 1) cartItems[index].quantity = 1;
}

// Remove Item from Cart
function removeItem(index) {
  cartItems.splice(index, 1);
}

// Proceed to Checkout
function proceedToCheckout() {
  router.push("/checkout");
}
</script>

<style scoped>
:root {
  --cream: #F0EAD2;
  --mint: #DDE5B6;
  --olive: #ADC178;
  --taupe: #A98467;
  --black: #000000;
}

.cart-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  background: var(--cream);
  overflow: hidden;
}

/* Left Panel Styling Matches CheckoutView */
.cart-illustration {
  position: relative;
  background: url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80') center/cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  color: var(--black);
}

.overlay-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(173,193,120,0.3));
}

.illustration-title {
  font-size: 3rem;
  font-weight: 900;
  color: var(--black);
  margin: 0;
}

.illustration-tag {
  font-size: 1rem;
  color: var(--black);
  margin-top: 0.5rem;
}

/* Right Panel Styling */
.cart-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.form-wrapper {
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  color: var(--black);
}

.tagline {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: var(--black);
}

/* Cart Table */
.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.cart-table th,
.cart-table td {
  border-bottom: 1px solid #ddd;
  padding: 0.6rem;
  text-align: left;
  font-size: 0.9rem;
}

.cart-table input {
  width: 60px;
  padding: 0.3rem;
  text-align: center;
  border-radius: 6px;
  border: 1px solid #ddd;
}

/* Cart Summary */
.cart-summary {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-summary h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--black);
}

/* Buttons */
.submit-btn {
  padding: 0.7rem 1rem;
  font-size: 0.95rem;
  border-radius: 10px;
  border: none;
  background: var(--olive);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: var(--taupe);
  transform: translateY(-1px);
}

.remove-btn {
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border: none;
  border-radius: 6px;
  background: #ff6b6b;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.remove-btn:hover {
  background: #e63946;
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1rem;
}

/* Responsive */
@media (max-width: 900px) {
  .cart-container {
    grid-template-columns: 1fr;
  }

  .cart-illustration {
    display: none;
  }

  .cart-panel {
    padding: 0;
  }

  .form-wrapper {
    padding: 1rem;
  }
}
</style>