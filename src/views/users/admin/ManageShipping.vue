<template>
  <div class="shipping-management">
    <!-- Header -->
    <header class="topbar">
      <h1>Shipping Management</h1>
      <button class="add-btn" @click="openModal">
        + Add Shipping
      </button>
    </header>

    
    <div v-if="message.text" :class="['message', message.type]">
      {{ message.text }}
      <button class="msg-close" @click="clearMessage">✕</button>
    </div>

    
    <section class="shipping-methods-section">
      <h2>Available Shipping Methods</h2>
      <div class="methods-grid">
        <div v-for="method in shippingMethods" :key="method.name" class="method-card">
          <div class="method-header">
            <span class="courier">{{ method.courier }}</span>
            <span class="cost">R{{ method.cost.toFixed(2) }}</span>
          </div>
          <div class="delivery-time">{{ method.deliveryTime }}</div>
        </div>
      </div>
    </section>

    
    <div class="table-wrap">
      <table class="shipping-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Address</th>
            <th>Estimated Delivery</th>
            <th>Status</th>
            <th>Tracking Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="shipments.length === 0">
            <td colspan="6" class="empty">No shipping records yet.</td>
          </tr>

          <tr v-for="shipment in shipments" :key="shipment.id">
            <td>{{ shipment.order_id }}</td>
            <td>{{ shipment.address || '—' }}</td>
            <td>{{ formatDate(shipment.estimated_delivery_date) }}</td>
            <td>
              <span
                class="status-badge"
                :class="statusClass(shipment.status)"
              >
                {{ shipment.status }}
              </span>
            </td>
            <td>{{ shipment.tracking_number || '—' }}</td>
            <td class="action-cell">
              <button class="btn-icon btn-edit" @click="editShipment(shipment)">Edit</button>
              <button class="btn-icon btn-delete" @click="deleteShipment(shipment.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit Shipping' : 'Add Shipping' }}</h2>
          <button class="close" @click="closeModal">✕</button>
        </div>

        <form @submit.prevent="submitForm" class="modal-body" novalidate>
          <div class="form-row">
            <label for="order_id">Order ID *</label>
            <input id="order_id" v-model.number="form.order_id" type="number" min="1" required />
            <div v-if="errors.order_id" class="error">{{ errors.order_id }}</div>
          </div>

          <div class="form-row">
            <label for="address">Address *</label>
            <textarea
              id="address"
              v-model.trim="form.address"
              required
              placeholder="Full delivery address"
            ></textarea>
            <div v-if="errors.address" class="error">{{ errors.address }}</div>
          </div>

          <div class="form-row">
            <label for="estimated_delivery_date">Estimated Delivery Date *</label>
            <input
              id="estimated_delivery_date"
              v-model="form.estimated_delivery_date"
              type="date"
              required
            />
            <div v-if="errors.estimated_delivery_date" class="error">{{ errors.estimated_delivery_date }}</div>
          </div>

          <div class="form-row">
            <label for="status">Status *</label>
            <select id="status" v-model="form.status" required>
              <option value="" disabled>Select Status</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
              <option>Delayed</option>
              <option>Cancelled</option>
            </select>
            <div v-if="errors.status" class="error">{{ errors.status }}</div>
          </div>

          <div class="form-row">
            <label for="tracking_number">Tracking Number</label>
            <input
              id="tracking_number"
              v-model.trim="form.tracking_number"
              placeholder="Optional"
            />
          </div>

          <div class="form-actions">
            <button type="button" class="btn-outline" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="submitting">
              {{ submitting ? 'Saving...' : (isEditing ? 'Update Shipping' : 'Add Shipping') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import shippingAPI from '@/api/business/shippingService'


const shippingMethods = [
  { courier: 'FastTrack Express', deliveryTime: '1-2 Business Days', cost: 85.00 },
  { courier: 'Standard Courier', deliveryTime: '3-5 Business Days', cost: 55.00 },
  { courier: 'Economy Shipping', deliveryTime: '5-7 Business Days', cost: 35.00 },
  { courier: 'Same Day Delivery', deliveryTime: 'Same Day', cost: 150.00 },
  { courier: 'International Express', deliveryTime: '7-10 Business Days', cost: 250.00 }
]


const shipments = ref([])
const loading = ref(false)
const submitting = ref(false)
const showModal = ref(false)
const isEditing = ref(false)
const currentShipmentId = ref(null)

const form = reactive({
  order_id: null,
  address: '',
  estimated_delivery_date: '',
  status: '',
  tracking_number: ''
})

const errors = reactive({
  order_id: '',
  address: '',
  estimated_delivery_date: '',
  status: '',
  tracking_number: ''
})

const message = reactive({
  text: '',
  type: '' 
})


onMounted(async () => {
  await loadShipments()
})

async function loadShipments() {
  loading.value = true
  try {
    const data = await shippingAPI.getAll()
    shipments.value = Array.isArray(data) ? data : []
  } catch (err) {
    showMessage('Failed to load shipping records.', 'error')
    console.error('Load shipments error:', err)
  } finally {
    loading.value = false
  }
}


function openModal() {
  resetForm()
  isEditing.value = false
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  clearErrors()
}


function resetForm() {
  form.order_id = null
  form.address = ''
  form.estimated_delivery_date = ''
  form.status = ''
  form.tracking_number = ''
  clearErrors()
}

function clearErrors() {
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
}

function showMessage(text, type) {
  message.text = text
  message.type = type
  setTimeout(clearMessage, 3500)
}

function clearMessage() {
  message.text = ''
  message.type = ''
}


function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString()
}


function statusClass(status) {
  const map = {
    'Processing': 'status-processing',
    'Shipped': 'status-shipped',
    'Out for Delivery': 'status-out',
    'Delivered': 'status-delivered',
    'Delayed': 'status-delayed',
    'Cancelled': 'status-cancelled'
  }
  return map[status] || 'status-default'
}


function validateForm() {
  clearErrors()
  let valid = true

  if (!form.order_id || form.order_id < 1) {
    errors.order_id = 'Valid Order ID is required'
    valid = false
  }
  if (!form.address?.trim()) {
    errors.address = 'Address is required'
    valid = false
  }
  if (!form.estimated_delivery_date) {
    errors.estimated_delivery_date = 'Estimated delivery date is required'
    valid = false
  }
  if (!form.status) {
    errors.status = 'Status is required'
    valid = false
  }

  return valid
}


function editShipment(shipment) {
  isEditing.value = true
  currentShipmentId.value = shipment.id
  Object.assign(form, {
    order_id: shipment.order_id,
    address: shipment.address || '',
    estimated_delivery_date: shipment.estimated_delivery_date ? new Date(shipment.estimated_delivery_date).toISOString().split('T')[0] : '',
    status: shipment.status || '',
    tracking_number: shipment.tracking_number || ''
  })
  showModal.value = true
}


async function submitForm() {
  if (!validateForm()) {
    showMessage('Please fix the form errors.', 'error')
    return
  }

  submitting.value = true
  try {
    if (isEditing.value) {
      
      const updatedData = { ...form, id: currentShipmentId.value }
      await shippingAPI.update(updatedData)
      showMessage('Shipping record updated successfully!', 'success')
    } else {
      
      const newShipment = await shippingAPI.create(form)
      showMessage('Shipping record added successfully!', 'success')
    }

    
    await loadShipments()
    closeModal()
  } catch (err) {
    showMessage('Operation failed. Please try again.', 'error')
    console.error('Submit error:', err)
  } finally {
    submitting.value = false
  }
}


async function deleteShipment(id) {
  if (!confirm('Are you sure you want to delete this shipping record?')) return

  try {
    await shippingAPI.delete(id) 
    await loadShipments()
    showMessage('Shipping record deleted.', 'success')
  } catch (err) {
    showMessage('Failed to delete shipping record.', 'error')
    console.error('Delete error:', err)
  }
}
</script>

<style scoped>
:root {
  --dark-green: #2d4a2b;
  --lime: #c7e96f;
}

/* Layout */
.shipping-management {
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

/* Add button */
.add-btn {
  background: var(--dark-green);
  color: #fff;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(45,74,43,0.12);
}
.add-btn:hover { opacity: 0.95; }

/* Messages */
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

/* Shipping Methods Section */
.shipping-methods-section {
  margin-bottom: 24px;
}
.shipping-methods-section h2 {
  font-size: 18px;
  color: #2d4a2b;
  margin-bottom: 16px;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.method-card {
  background: #c7e96f;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.courier {
  font-weight: 600;
  color: #2d4a2b;
}
.cost {
  font-weight: bold;
  color: #2d4a2b;
}
.delivery-time {
  color: #2d4a2b;
  font-size: 14px;
}


.table-wrap {
  overflow-x: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

.shipping-table {
  width: 100%;
  border-collapse: collapse;
}

.shipping-table thead th {
  background: var(--dark-green);
  color: #fff;
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
}

.shipping-table tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid #f3f3f3;
  vertical-align: middle;
  font-size: 14px;
}

.shipping-table tbody tr:hover {
  background: #fbffef;
}

.empty {
  padding: 24px;
  text-align: center;
  color: #666;
}

/* Status badges */
.status-badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}
.status-processing { background: #ffc107; color: #664d03; }
.status-shipped { background: #198754; color: #fff; }
.status-out { background: #0d6efd; color: #fff; }
.status-delivered { background: #198754; color: #fff; }
.status-delayed { background: #dc3545; color: #fff; }
.status-cancelled { background: #6c757d; color: #fff; }

/* Action Buttons */
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
.btn-delete {
  color: #d9534f;
}
.btn-delete:hover {
  background: #faeaea;
}

/* Modal */
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

/* Form */
.form-row {
  display: flex;
  flex-direction: column;
}
.form-row label { font-size: 13px; margin-bottom: 6px; color: #333; }
.form-row input,
.form-row textarea,
.form-row select {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
}
.form-row textarea {
  resize: vertical;
  min-height: 60px;
}
.form-row input:focus,
.form-row textarea:focus,
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

/* Buttons */
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

/* Responsive */
@media (max-width: 720px) {
  .modal { max-width: 95%; }
  .shipping-table thead th { font-size: 12px; }
  .shipping-table tbody td { font-size: 13px; padding: 10px; }
  .topbar { flex-direction: column; align-items: stretch; gap: 10px; }
  .action-cell {
    flex-direction: column;
    gap: 2px;
  }
  .btn-icon {
    padding: 6px 10px;
    font-size: 13px;
  }
  .methods-grid {
    grid-template-columns: 1fr;
  }
}
</style>