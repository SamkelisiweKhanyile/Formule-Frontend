<template>
  <div class="customers-view">
    <h1>Customers</h1>

    
    <div class="customers-grid">
      <div v-if="customers.length === 0" class="empty-state">
        <p>No customers yet. They will appear here once the backend is connected successfully.</p>
      </div>

      <div
        v-for="customer in customers"
        :key="customer.id"
        class="customer-card"
      >
        
        <div class="card-header">
          <h3>{{ customer.fullName || 'N/A' }}</h3>
          <span class="status-badge active">Active</span>
        </div>

        <div class="info-section">
          <p><strong>Email:</strong> {{ customer.email }}</p>
          <p><strong>Phone:</strong> {{ customer.phone || '—' }}</p>
        </div>
        <div class="info-section">
          <p><strong>Total Orders:</strong> {{ customer.totalOrders || 0 }}</p>
          <p><strong>Payment Methods:</strong> {{ customer.paymentMethods?.length || 0 }} saved</p>
        </div>

      
        <div class="actions">
          <button @click="viewOrderHistory(customer.id)" class="btn-outline">
            View Orders
          </button>
        </div>
      </div>
    </div>

    
    <div v-if="selectedCustomerId" class="order-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Order History</h3>
          <button @click="selectedCustomerId = null" class="close-btn">&times;</button>
        </div>

        <div v-if="orderHistory.length === 0" class="empty-state">
          <p>No orders found for this customer yet.</p>
        </div>

        <div v-else class="orders-list">
          <div v-for="order in orderHistory" :key="order.id" class="order-item">
            <p><strong>Order #{{ order.id }}</strong></p>
            <p>Status: <span class="status">{{ order.status }}</span></p>
            <p>Shipping: {{ order.shippingStatus || 'Pending' }}</p>
            <p>Delivered: {{ order.deliveredAt ? formatDate(order.deliveredAt) : '—' }}</p>
            <p>Total: R{{ order.total?.toFixed(2) || '0.00' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import customerAPI from '@/api/business/customerService' 
import orderAPI from '@/api/business/orderService'       

const customers = ref([])
const selectedCustomerId = ref(null)
const orderHistory = ref([])


onMounted(async () => {
  try {
    customers.value = await customerAPI.getAll()
  } catch (error) {
    console.error('Failed to load customers:', error)
  }
})

const viewOrderHistory = async (customerId) => {
  selectedCustomerId.value = customerId
  try {
    orderHistory.value = await orderAPI.getByCustomer(customerId)
  } catch (error) {
    console.error('Failed to load order history:', error)
    orderHistory.value = [] // Ensure empty on error
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString()
}
</script>

<style scoped>
.customers-view {
  padding: 20px;
}

h1 {
  color: var(--text-dark);
  margin-bottom: 20px;
  font-size: 24px;
}

.customers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.customer-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s;
}

.customer-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  color: var(--text-dark);
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  background-color: #c7e96f;
  color: #2d4a2b;
}

.info-section {
  margin: 10px 0;
  font-size: 14px;
  color: #444;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.btn-outline {
  padding: 6px 12px;
  border: 1px solid var(--dark-green);
  background: transparent;
  color: var(--dark-green);
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.order-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  width: 90%;
  max-width: 600px;
  border-radius: 10px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.orders-list {
  padding: 0 20px 20px;
}

.order-item {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-item .status {
  color: #2d4a2b;
  font-weight: bold;
}

.empty-state {
  grid-column: 1 / -1;
  padding: 40px 20px;
  text-align: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  color: #666;
  font-size: 16px;
}
</style>