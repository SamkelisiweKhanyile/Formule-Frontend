<template>
  <div class="order-container">
    
    <div class="order-illustration">
      <div class="overlay-gradient"></div>
      <h1 class="illustration-title">Formulé</h1>
      <p class="illustration-tag">Nurture Your Glow ✨</p>
    </div>

   
    <div class="order-panel">
      <div class="form-wrapper">
        <h2 class="brand-title">Checkout</h2>
        <p class="tagline">Complete your order and shipping details below.</p>

        
        <div class="tabs">
          <button :class="{ active: isOrderStep }" @click="isOrderStep = true">Order</button>
          <button :class="{ active: !isOrderStep }" @click="isOrderStep = false">Shipping</button>
        </div>

       
        <form @submit.prevent="handleSubmit" class="order-form">
          
          <template v-if="isOrderStep">
            <div class="form-group">
              <label for="productName">Product</label>
              <input id="productName" v-model="form.productName" type="text" required />
            </div>
            <div class="form-group">
              <label for="quantity">Quantity</label>
              <input id="quantity" v-model="form.quantity" type="number" min="1" required />
            </div>
            <div class="form-group">
              <label for="notes">Order Notes (optional)</label>
              <textarea id="notes" v-model="form.notes" rows="3"></textarea>
            </div>
          </template>

          <template v-else>
            <div class="form-group">
              <label for="fullName">Full Name</label>
              <input id="fullName" v-model="form.fullName" type="text" required />
            </div>
            <div class="form-group">
              <label for="phoneNumber">Phone Number</label>
              <input id="phoneNumber" v-model="form.phoneNumber" type="tel" required />
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input id="address" v-model="form.address" type="text" required />
            </div>
            <div class="form-group">
              <label for="city">City</label>
              <input id="city" v-model="form.city" type="text" required />
            </div>
            <div class="form-group">
              <label for="postalCode">Postal Code</label>
              <input id="postalCode" v-model="form.postalCode" type="text" required />
            </div>
            <div class="form-group">
              <label for="shippingMethod">Shipping Method</label>
              <select id="shippingMethod" v-model="form.shippingMethod" required>
                <option disabled value="">Select method</option>
                <option>Standard (3-5 days)</option>
                <option>Express (1-2 days)</option>
                <option>Overnight</option>
              </select>
            </div>
          </template>

          <button type="submit" class="submit-btn">
            {{ isOrderStep ? 'Save & Continue' : 'Place Order' }}
          </button>
        </form>

        <transition name="fade">
          <div v-if="submitted" class="success-toast">
            {{ successMessage }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const isOrderStep = ref(true);
const submitted = ref(false);
const successMessage = ref("");

const form = reactive({
  productName: "",
  quantity: 1,
  notes: "",
  fullName: "",
  phoneNumber: "",
  address: "",
  city: "",
  postalCode: "",
  shippingMethod: ""
});

const handleSubmit = () => {
  submitted.value = false;
  successMessage.value = "";

  if (isOrderStep.value) {
    
    isOrderStep.value = false;
  } else {
   
    console.log("Order placed:", { ...form });
    successMessage.value = "Your order has been placed successfully! 🎉";
    submitted.value = true;


    Object.keys(form).forEach((key) => (form[key] = ""));
    isOrderStep.value = true;
  }
};
</script>

<style scoped>
:root {
  --cream: #F0EAD2;
  --mint: #DDE5B6;
  --olive: #ADC178;
  --taupe: #A98467;
  --black: #000000;
}

.order-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  background: var(--cream);
}

.order-illustration {
  position: relative;
  background: url('https://images.unsplash.com/photo-1590431257863-6bc6f07b83f1?auto=format&fit=crop&w=1400&q=80') center/cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
}
.overlay-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(173,193,120,0.3));
}
.illustration-title { font-size: 3rem; font-weight: 900; color: var(--black); margin:0; }
.illustration-tag { font-size: 1rem; color: var(--black); margin-top:0.5rem; }

.order-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.form-wrapper {
  width: 100%;
  max-width: 460px;
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
}

.brand-title { font-size: 1.8rem; font-weight:700; margin-bottom:0.2rem; color: var(--black); }
.tagline { font-size:0.9rem; margin-bottom:1rem; color: var(--black); }

.tabs { display: flex; margin-bottom:1rem; border-radius:10px; overflow:hidden; }
.tabs button { flex:1; padding:0.6rem; font-size:0.85rem; border:none; background:#fafafa; cursor:pointer; transition: all 0.3s; }
.tabs button.active { background: var(--olive); color:white; }

.form-group { margin-bottom:0.7rem; display:flex; flex-direction:column; }
label { font-size:0.8rem; margin-bottom:0.2rem; }
input, select, textarea { padding:0.6rem; font-size:0.85rem; border-radius:6px; border:1px solid #ddd; resize:none; }

.submit-btn {
  padding:0.8rem;
  font-size:0.95rem;
  border-radius:10px;
  border:none;
  background: var(--olive);
  color:white;
  font-weight:600;
  cursor:pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
}
.submit-btn:hover { background: var(--taupe); transform: translateY(-1px); }

.success-toast {
  position: fixed;
  bottom:1rem;
  right:1rem;
  padding:0.6rem 1.2rem;
  border-radius:10px;
  background: var(--mint);
  color: var(--black);
  font-weight:600;
  box-shadow:0 4px 12px rgba(0,0,0,0.1);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .order-container { grid-template-columns: 1fr; }
  .order-illustration { display:none; }
  .order-panel { padding:0; }
  .form-wrapper { padding:1rem; }
}
</style>