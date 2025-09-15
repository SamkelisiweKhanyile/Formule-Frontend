<template>
  <div class="checkout-layout">
    
    <div class="checkout-hero">
      <h1>🛒 Ready to Checkout</h1>
      <p>Please review your order and shipping details below.</p>
    </div>

    <div class="checkout-grid">
      <div class="checkout-card address-card">
        <div class="card-header">
          <h2>📍 Shipping Address</h2>
        </div>
        <div class="card-body">
          <AddressForm
            :initial-address="shippingAddress"
            :is-for-checkout="true"
            @address-changed="updateShippingAddress"
          />
        </div>
      </div>

      <div class="checkout-card summary-card">
        <div class="card-header">
          <h2>📦 Order Summary</h2>
        </div>
        <div class="card-body">
          <div v-if="loading" class="loading-state">
            Loading your cart...
          </div>

          <div v-else-if="cartItems.length === 0" class="empty-state">
            Your cart is empty. <router-link to="/">Go shopping</router-link>
          </div>

          <div v-else class="cart-items">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="cart-item"
            >
              <div class="item-image">
                <img 
                  :src="getImageUrl(item.product.image_url)" 
                  :alt="item.product.name"
                  @error="onImageError"
                />
              </div>

              <div class="item-details">
                <h4 class="item-name">{{ item.product.name }}</h4>
              </div>

              <div class="item-quantity">×{{ item.quantity }}</div>

              <div class="item-price">R{{ item.product.price.toFixed(2) }}</div>

              <div class="item-total">R{{ (item.product.price * item.quantity).toFixed(2) }}</div>
            </div>
          </div>

          <div v-if="cartItems.length > 0" class="order-total">
            <div class="total-label">Order Total</div>
            <div class="total-amount">R{{ cartTotal }}</div>
          </div>
        </div>
      </div>
    </div>

    
    <div class="checkout-footer">
      <div class="footer-content">
        <div class="total-display">
          Total: <strong class="total-value">R{{ cartTotal }}</strong>
        </div>
        <button
          @click="handleCheckout"
          class="btn-confirm"
          :disabled="!isFormComplete || loading || cartItems.length === 0"
        >
          ✅ Confirm Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/store/userStore.js';
import { useRouter } from 'vue-router';
import cartAPI from '@/api/business/CartService.js';
import AddressForm from '@/components/generic/AddressForm.vue';

const userStore = useUserStore();
const router = useRouter();


const shippingAddress = ref({
  street: '',
  city: '',
  province: '',
  postalCode: '',
  country: 'South Africa'
});

const currentAddress = ref({ ...shippingAddress.value });
const cartItems = ref([]);
const loading = ref(false);

const fallbackImage = 'https://via.placeholder.com/80x80.png?text=No+Image';

function getImageUrl(url) {
  if (!url) return fallbackImage;
  if (url.includes('dropbox.com')) {
    return url
      .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
      .replace('?dl=0', '');
  }
  return url;
}

function onImageError(event) {
  event.target.src = fallbackImage;
}

onMounted(async () => {
  if (!userStore.user?.id) {
    alert("Please log in to checkout.");
    router.push('/auth');
    return;
  }

  loading.value = true;
  try {
    const cart = await cartAPI.getCartByCustomerId(userStore.user.id);
    cartItems.value = cart?.items || [];
  } catch (error) {
    console.error("Failed to load cart:", error);
    alert("Failed to load your cart. Please try again.");
  } finally {
    loading.value = false;
  }
});

// Computed
const cartTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2);
});

const isFormComplete = computed(() => {
  return Object.values(currentAddress.value).every(val => val && val.trim().length > 0);
});


const updateShippingAddress = (address) => {
  currentAddress.value = { ...address };
};

const handleCheckout = async () => {
  if (!isFormComplete.value) {
    alert('❗ Please fill in all shipping address fields.');
    return;
  }

  if (cartItems.value.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const checkoutPayload = {
    customerId: userStore.user.id,
    shippingAddress: currentAddress.value,
    items: cartItems.value.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      unitPrice: item.product.price,
      totalPrice: (item.product.price * item.quantity).toFixed(2)
    })),
    totalAmount: parseFloat(cartTotal.value),
    currency: 'ZAR',
    timestamp: new Date().toISOString()
  };

  console.log('🚀 Sending to backend:', checkoutPayload);

  try {
    alert('🎉 Order confirmed! Redirecting to payment...');
    router.push('/order-confirmation');
  } catch (error) {
    console.error("Checkout failed:", error);
    alert("Checkout failed. Please try again.");
  }
};
</script>

<style scoped>
/* (styles unchanged) */
:root {
  --cream: #dad7cd;
  --sage: #a3b18a;
  --olive: #588157;
  --forest: #3a5a40;
  --dark-green: #344e41;
}

.checkout-layout {
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 2rem 1rem;
  font-family: 'Inter', system-ui, sans-serif;
}

.checkout-hero {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--sage), var(--olive));
  color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(52, 78, 65, 0.15);
}

.checkout-hero h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.checkout-hero p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

/* Grid */
.checkout-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .checkout-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Cards */
.checkout-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.checkout-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: var(--sage);
  padding: 1.2rem 1.5rem;
  color: var(--dark-green);
}

.card-header h2 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-body {
  padding: 1.5rem;
}

/* Loading & Empty States */
.loading-state,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.empty-state a {
  color: var(--olive);
  text-decoration: underline;
  font-weight: 500;
}

/* Cart Items */
.cart-items {
  margin-bottom: 1.5rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 60px 2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.item-image {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
}

.item-details {
  text-align: left;
}

.item-name {
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem;
  font-size: 1rem;
}

.item-quantity,
.item-price,
.item-total {
  text-align: center;
  font-weight: 600;
  color: #333;
}

.item-total {
  color: var(--olive);
  font-weight: 700;
}

/* Order Total */
.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0 0;
  border-top: 2px solid var(--sage);
  margin-top: 1rem;
}

.total-label {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
}

.total-amount {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--forest);
}

/* Sticky Footer */
.checkout-footer {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  backdrop-filter: blur(10px);
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.total-display {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.total-value {
  color: var(--forest);
  font-size: 1.3rem;
}

.btn-confirm {
  background: var(--olive);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.85rem 2.5rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(88, 129, 87, 0.4);
  min-width: 200px;
}

.btn-confirm:hover:not(:disabled) {
  background: var(--forest);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(58, 90, 64, 0.5);
}

.btn-confirm:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* AddressForm override */
:deep(.address-form-container) {
  transform: none !important;
  margin: 0 !important;
  background: transparent !important;
  padding: 0 !important;
  box-shadow: none !important;
}

:deep(.form-title) {
  display: none !important;
}

:deep(.form-actions) {
  display: none !important;
}

/* Responsive */
@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 60px 1fr;
    gap: 0.75rem;
  }

  .item-details,
  .item-quantity,
  .item-price,
  .item-total {
    grid-column: 2;
    padding-left: 0.5rem;
  }

  .item-quantity {
    font-size: 0.9rem;
    color: #666;
  }

  .item-price,
  .item-total {
    margin-top: 0.25rem;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .btn-confirm {
    width: 100%;
    max-width: 300px;
  }
}
</style>
