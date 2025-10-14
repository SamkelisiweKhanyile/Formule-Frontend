
<template>
  <div class="cart-container">
    <h3 class="cart-title">Your Cart ({{ selectedItems.size }} of {{ cartItems.length }} selected)</h3>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a3b18a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p>Your cart is empty</p>
      </div>
    </div>

    <div v-else class="cart-content">
      
      <div class="select-all-section">
        <label class="select-all-label">
          <input 
            type="checkbox" 
            :checked="selectAll" 
            @change="toggleSelectAll"
            class="select-all-checkbox"
          />
          <span class="select-all-text">Select All Items</span>
        </label>
      </div>

     
      <div class="cart-items-grid">
        <div 
          v-for="item in cartItems" 
          :key="item.id" 
          class="cart-item-card"
          :class="{ 'selected-item': selectedItems.has(item.id) }"
        >
          <!-- Selection Checkbox -->
          <div class="item-selection">
            <input 
              type="checkbox" 
              :checked="selectedItems.has(item.id)" 
              @change="toggleItemSelection(item.id)"
              class="item-checkbox"
            />
          </div>

          
          <div class="item-image">
            <img :src="getImageUrl(item.product.image_url)" :alt="item.product.name" />
          </div>

          
          <div class="item-info">
            <h4 class="product-name">{{ item.product.name }}</h4>
            <p class="product-brand">{{ item.product.brand }}</p>
            <p class="product-price">R{{ item.product.price.toFixed(2) }}</p>
            
            
            <div class="quantity-controls">
              <button 
                @click="decreaseQuantity(item)" 
                :disabled="item.quantity <= 1"
                class="quantity-btn"
              >
                -
              </button>
              <span class="quantity-display">{{ item.quantity }}</span>
              <button 
                @click="increaseQuantity(item)" 
                class="quantity-btn"
              >
                +
              </button>
            </div>
          </div>

         
          <div class="item-actions">
            <div class="item-total">
              <span class="total-label">Subtotal:</span>
              <span class="total-amount">R{{ (item.product.price * item.quantity).toFixed(2) }}</span>
            </div>
            <button @click="removeItem(item.id)" class="remove-btn" title="Remove item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      
      <div class="cart-summary">
        <div class="summary-row">
          <span>Selected Items:</span>
          <strong>{{ selectedItems.size }}</strong>
        </div>
        <div class="summary-row">
          <span>Selected Total:</span>
          <strong class="selected-total">R{{ selectedTotal.toFixed(2) }}</strong>
        </div>
        <div class="summary-row">
          <span>Cart Total:</span>
          <strong class="cart-total">R{{ grandTotal.toFixed(2) }}</strong>
        </div>
        <button 
          @click="proceedToCheckout" 
          class="checkout-btn"
          :disabled="selectedItems.size === 0"
        >
          🛒 Proceed to Checkout ({{ selectedItems.size }} item{{ selectedItems.size !== 1 ? 's' : '' }})
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/store/userStore.js';
import { useRouter } from 'vue-router';
import cartAPI from '@/api/customer/cartService.js';

const props = defineProps({
  customerId: {
    type: Number,
    required: true
  }
});

const router = useRouter();
const cartItems = ref([]);
const selectedItems = ref(new Set());

const fallbackImage = 'https://via.placeholder.com/300x300.png?text=No+Image';


const selectAll = computed(() => {
  return cartItems.value.length > 0 && selectedItems.value.size === cartItems.value.length;
});


const selectedTotal = computed(() => {
  return cartItems.value
    .filter(item => selectedItems.value.has(item.id))
    .reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
});


const grandTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);
});

function getImageUrl(url) {
  if (!url) return fallbackImage;
  if (url.includes('dropbox.com')) {
    return url
      .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
      .replace('?dl=0', '');
  }
  return url;
}


const loadCart = async () => {
  try {
    const cart = await cartAPI.getCartByCustomerId(props.customerId);
    cartItems.value = cart?.items || [];
    selectedItems.value = new Set(cartItems.value.map(item => item.id));
  } catch (error) {
    console.error("Failed to load cart:", error);
  }
};

onMounted(() => {
  loadCart();
});


const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = new Set();
  } else {
    selectedItems.value = new Set(cartItems.value.map(item => item.id));
  }
};


const toggleItemSelection = (itemId) => {
  if (selectedItems.value.has(itemId)) {
    selectedItems.value.delete(itemId);
  } else {
    selectedItems.value.add(itemId);
  }
};


const increaseQuantity = async (item) => {
  try {
    
    await cartAPI.addToCart(
      props.customerId,
      item.product.id,
      1
    );

    
    await loadCart();
  } catch (error) {
    alert("Failed to update quantity");
    console.error(error);
  }
};

const decreaseQuantity = async (item) => {
  if (item.quantity <= 1) return;

  try {
    
    await cartAPI.addToCart(
      props.customerId,
      item.product.id,
      -1
    );

    
    await loadCart();
  } catch (error) {
    alert("Failed to update quantity");
    console.error(error);
  }
};

const removeItem = async (itemId) => {
  if (!confirm("Are you sure you want to remove this item?")) return;

  try {
    
    await cartAPI.deleteItem(itemId);

    
    const cart = await cartAPI.getCartByCustomerId(props.customerId);
    cartItems.value = cart?.items || [];

    selectedItems.value = new Set(cartItems.value.map(item => item.id));

    alert("Item removed from cart");
  } catch (error) {
    alert("Failed to remove item");
    console.error(error);
  }
};


const proceedToCheckout = () => {
  if (selectedItems.value.size === 0) {
    alert("Please select at least one item to checkout");
    return;
  }
  router.push('/checkout');
};
</script>

<style scoped>
.cart-container {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  margin: 2rem auto;
  max-width: 1000px;
  font-family: 'Poppins', sans-serif;
}

.cart-title {
  color: #0a3d0a;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-state svg {
  width: 64px;
  height: 64px;
}

.empty-state p {
  color: #666;
  font-size: 1.1rem;
}

.select-all-section {
  background: #f0f7f0;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid #d0e8d0;
}

.select-all-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.select-all-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.select-all-text {
  font-weight: 600;
  color: #0a3d0a;
  font-size: 1.1rem;
}

.cart-items-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.cart-item-card {
  display: grid;
  grid-template-columns: 40px 80px 1fr auto;
  gap: 1rem;
  padding: 1.2rem;
  background: #f9fff9;
  border-radius: 16px;
  border: 2px solid #e0f0e0;
  transition: all 0.3s ease;
}

.cart-item-card.selected-item {
  border-color: #588157;
  background: #f0f9f0;
  box-shadow: 0 4px 12px rgba(88, 129, 87, 0.1);
}

.item-selection {
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.item-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #e0f0e0;
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-name {
  margin: 0 0 0.3rem 0;
  color: #333;
  font-weight: 600;
  font-size: 1.1rem;
}

.product-brand {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.product-price {
  color: #0a3d0a;
  font-weight: 600;
  margin: 0 0 0.8rem 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: 2px solid #0a3d0a;
  background: white;
  color: #0a3d0a;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.quantity-btn:hover:not(:disabled) {
  background: #0a3d0a;
  color: white;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #ccc;
  color: #ccc;
}

.quantity-display {
  font-weight: 600;
  min-width: 24px;
  text-align: center;
  font-size: 1.1rem;
}

.item-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.item-total {
  text-align: right;
}

.total-label {
  display: block;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}

.total-amount {
  font-weight: 700;
  color: #0a3d0a;
  font-size: 1.2rem;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #d9534f;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #fdf2f2;
  color: #c9302c;
}

.cart-summary {
  background: #e8f5e8;
  padding: 1.5rem;
  border-radius: 16px;
  border: 2px solid #a3b18a;
  text-align: right;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.summary-row strong {
  font-weight: 600;
}

.selected-total {
  color: #0a3d0a;
  font-size: 1.3rem;
}

.cart-total {
  color: #3a5a40;
  font-size: 1.4rem;
}

.summary-row:last-child {
  margin-bottom: 1.5rem;
}

.checkout-btn {
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 1rem auto 0;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  background: #0a3d0a;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(10, 61, 10, 0.3);
}

.checkout-btn:hover:not(:disabled) {
  background: #116611;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(10, 61, 10, 0.4);
}

.checkout-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>