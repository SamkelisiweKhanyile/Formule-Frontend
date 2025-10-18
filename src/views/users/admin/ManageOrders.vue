<template>
  <div class="orders-management">
    
    <header class="topbar">
      <h1>Order Management</h1>
    </header>

   
    <div v-if="message.text" :class="['message', message.type]">
      {{ message.text }}
      <button class="msg-close" @click="clearMessage">✕</button>
    </div>

   
    <div class="table-wrap">
      <table class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="orders.length === 0">
            <td colspan="6" class="empty">No orders yet.</td>
          </tr>

          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.order_id }}</td>
            <td>{{ getCustomerName(order.customer_id) }}</td>
            <td>{{ formatDate(order.order_date) }}</td>
            <td>
              <span
                class="status-badge"
                :class="statusClass(order.status)"
              >
                {{ order.status }}
              </span>
            </td>
            <td>R{{ order.total_amount.toFixed(2) }}</td>
            <td class="action-cell">
              <button class="btn-icon btn-edit" @click="editOrder(order)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

   
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>Edit Order: {{ currentOrder?.order_id }}</h2>
          <button class="close" @click="closeModal">✕</button>
        </div>

        <form @submit.prevent="submitForm" class="modal-body" novalidate>
          <div class="form-row">
            <label for="order_id">Order ID *</label>
            <input id="order_id" v-model.trim="form.order_id" disabled />
          </div>

          <div class="form-row">
            <label for="customer_name">Customer Name</label>
            <input id="customer_name" :value="getCustomerName(form.customer_id)" disabled />
          </div>

          <div class="form-row">
            <label for="order_date">Order Date</label>
            <input id="order_date" :value="formatDateTime(form.order_date)" disabled />
          </div>

          <div class="form-row">
            <label for="total_amount">Total Amount (R) *</label>
            <input
              id="total_amount"
              v-model.number="form.total_amount"
              type="number"
              min="0"
              step="0.01"
              required
            />
            <div v-if="errors.total_amount" class="error">{{ errors.total_amount }}</div>
          </div>

          <div class="form-row">
            <label for="status">Status *</label>
            <select id="status" v-model="form.status" required>
              <option value="" disabled>Select Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
              <option>Refunded</option>
            </select>
            <div v-if="errors.status" class="error">{{ errors.status }}</div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-outline" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="submitting">
              {{ submitting ? 'Saving...' : 'Update Order' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import orderAPI from '@/api/business/orderService'     
import customerAPI from '@/api/users/customerService' 


const orders = ref([])
const customersMap = ref(new Map()) 
const loading = ref(false)
const submitting = ref(false)
const showModal = ref(false)

const form = reactive({
  id: null,
  order_id: '',
  order_date: '',
  total_amount: 0,
  customer_id: null,
  status: ''
})

const errors = reactive({
  total_amount: '',
  status: ''
})

const message = reactive({
  text: '',
  type: '' 
})


onMounted(async () => {
  await Promise.all([
    loadOrders(),
    loadCustomersForLookup()
  ])
})


async function loadOrders() {
  loading.value = true
  try {
    const data = await orderAPI.getAll()
    orders.value = Array.isArray(data) ? data : []
  } catch (err) {
    showMessage('Failed to load orders.', 'error')
    console.error('Load orders error:', err)
  } finally {
    loading.value = false
  }
}


async function loadCustomersForLookup() {
  try {
    const customers = await customerAPI.getAll()
    const map = new Map()
    customers.forEach(c => {
      
      const name = c.fullName || (c.first_name && c.last_name
        ? `${c.first_name} ${c.last_name}`
        : `Customer ${c.id}`)
      map.set(c.id, name)
    })
    customersMap.value = map
  } catch (err) {
    console.warn('Could not load customer names for display:', err)
    
  }
}


function openModal(order) {
  Object.assign(form, {
    id: order.id,
    order_id: order.order_id || '',
    order_date: order.order_date ? new Date(order.order_date).toISOString().split('T')[0] : '',
    total_amount: order.total_amount || 0,
    customer_id: order.customer_id || null,
    status: order.status || ''
  })
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  clearErrors()
}


function getCustomerName(customerId) {
  if (!customerId) return '—'
  return customersMap.value.get(customerId) || `ID: ${customerId}`
}

function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-ZA')
}

function formatDateTime(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleString('en-ZA')
}

function statusClass(status) {
  const classes = {
    'Pending': 'status-pending',
    'Processing': 'status-processing',
    'Shipped': 'status-shipped',
    'Delivered': 'status-delivered',
    'Cancelled': 'status-cancelled',
    'Refunded': 'status-refunded'
  }
  return classes[status] || 'status-default'
}


function validateForm() {
  clearErrors()
  let valid = true

  if (typeof form.total_amount !== 'number' || form.total_amount <= 0) {
    errors.total_amount = 'Total amount must be greater than 0'
    valid = false
  }
  if (!form.status) {
    errors.status = 'Status is required'
    valid = false
  }

  return valid
}

function clearErrors() {
  errors.total_amount = ''
  errors.status = ''
}

function showMessage(text, type) {
  message.text = text
  message.type = type
  setTimeout(() => {
    message.text = ''
    message.type = ''
  }, 3500)
}


async function submitForm() {
  if (!validateForm()) {
    showMessage('Please fix the form errors.', 'error')
    return
  }

  submitting.value = true
  try {
    
    const updatedOrder = await orderAPI.update({
      id: form.id,
      order_id: form.order_id,
      order_date: form.order_date,
      total_amount: form.total_amount,
      customer_id: form.customer_id,
      status: form.status
    })

    
    const index = orders.value.findIndex(o => o.id === updatedOrder.id)
    if (index !== -1) {
      orders.value[index] = updatedOrder
    }

    showMessage('Order updated successfully!', 'success')
    closeModal()
  } catch (err) {
    showMessage('Failed to update order. Please try again.', 'error')
    console.error('Update error:', err)
  } finally {
    submitting.value = false
  }
}

function editOrder(order) {
  openModal(order)
}
</script>
<style scoped>
:root {
  --dark-green: #2d4a2b;
  --lime: #c7e96f;
}

.orders-management {
  padding: 20px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  color: #222;
  max-width: 1100px;
  margin: 0 auto;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

h1 {
  margin: 0;
  font-size: 20px;
  color: var(--dark-green);
}

.message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 12px;
}
.message.success { background: #e6f7ea; color: #164d2d; border: 1px solid rgba(139,195,74,0.15); }
.message.error { background: #fff0f0; color: #7a1a1a; border: 1px solid rgba(229,62,62,0.12); }
.msg-close {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 12px;
}

.table-wrap {
  overflow-x: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table thead th {
  background: var(--dark-green);
  color: #fff;
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
}

.orders-table tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid #f3f3f3;
  vertical-align: middle;
  font-size: 14px;
}

.orders-table tbody tr:hover {
  background: #fbffef;
}

.empty {
  padding: 24px;
  text-align: center;
  color: #666;
}

.status-badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}
.status-pending { background: #ffc107; color: #664d03; }
.status-processing { background: #17a2b8; color: #fff; }
.status-shipped { background: #198754; color: #fff; }
.status-delivered { background: #198754; color: #fff; }
.status-cancelled { background: #6c757d; color: #fff; }
.status-refunded { background: #dc3545; color: #fff; }

.action-cell {
  display: flex;
  gap: 4px;
}
.btn-icon {
  background: none;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}
.btn-edit {
  color: #1a73e8;
}
.btn-edit:hover {
  background: #e8f0fe;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  width: 100%;
  max-width: 560px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.25);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid #f0f0f0;
}
.modal-header h2 { margin: 0; color: var(--dark-green); font-size: 18px; }
.close {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-body {
  padding: 16px 18px;
  display: grid;
  gap: 12px;
}

.form-row {
  display: flex;
  flex-direction: column;
}
.form-row label { font-size: 13px; margin-bottom: 6px; color: #333; }
.form-row input,
.form-row select {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
}
.form-row input:focus,
.form-row select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(199,233,111,0.12);
  border-color: var(--lime);
}

.error {
  color: #b00020;
  font-size: 12px;
  margin-top: 6px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 6px;
}
.btn-outline {
  background: transparent;
  border: 1px solid var(--dark-green);
  color: var(--dark-green);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}
.btn-primary {
  background: var(--dark-green);
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
}
.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 720px) {
  .modal { max-width: 95%; }
  .orders-table thead th { font-size: 12px; }
  .orders-table tbody td { font-size: 13px; padding: 10px; }
  .topbar { flex-direction: column; align-items: stretch; gap: 10px; }
  .action-cell {
    flex-direction: column;
    gap: 2px;
  }
  .btn-icon {
    padding: 6px 10px;
    font-size: 13px;
  }
}
</style>