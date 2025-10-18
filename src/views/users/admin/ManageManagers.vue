<template>
  <div class="managers-management">
    <!-- Header -->
    <header class="topbar">
      <h1>Manager Management</h1>
      <button class="add-btn" @click="openModal">
        + Add Manager
      </button>
    </header>

    <!-- Messages -->
    <div v-if="message.text" :class="['message', message.type]">
      {{ message.text }}
      <button class="msg-close" @click="clearMessage">✕</button>
    </div>

    <!-- Managers Table -->
    <div class="table-wrap">
      <table class="managers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="managers.length === 0">
            <td colspan="6" class="empty">No managers yet.</td>
          </tr>

          <tr v-for="manager in managers" :key="manager.id">
            <td>{{ manager.id }}</td>
            <td>{{ managerDisplayName(manager) }}</td>
            <td>{{ manager.email_address }}</td>
            <td>{{ formatPhoneDisplay(manager.phone_number) }}</td>
            <td>
              <span class="role-badge">{{ manager.role }}</span>
            </td>
            <td class="action-cell">
              <button class="btn-icon btn-edit" @click="editManager(manager)">Edit</button>
              <button class="btn-icon btn-delete" @click="deleteManager(manager.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit Manager' : 'Add Manager' }}</h2>
          <button class="close" @click="closeModal">✕</button>
        </div>

        <form @submit.prevent="submitForm" class="modal-body" novalidate>
          <div class="form-row">
            <label for="first_name">First Name *</label>
            <input id="first_name" v-model.trim="form.first_name" required />
            <div v-if="errors.first_name" class="error">{{ errors.first_name }}</div>
          </div>

          <div class="form-row">
            <label for="last_name">Last Name *</label>
            <input id="last_name" v-model.trim="form.last_name" required />
            <div v-if="errors.last_name" class="error">{{ errors.last_name }}</div>
          </div>

          <div class="form-row">
            <label for="email_address">Email Address *</label>
            <input id="email_address" v-model.trim="form.email_address" type="email" required />
            <div v-if="errors.email_address" class="error">{{ errors.email_address }}</div>
          </div>

          <div class="form-row">
            <label for="phone_number">Phone Number *</label>
            <input
              id="phone_number"
              v-model="form.phone_number"
              @input="onPhoneInput"
              placeholder="+27 123 456 789"
              required
            />
            <div v-if="errors.phone_number" class="error">{{ errors.phone_number }}</div>
          </div>

          <div class="form-row">
            <label for="role">Role *</label>
            <select id="role" v-model="form.role" required>
              <option value="" disabled>Select Role</option>
              <option>Manager</option>
              <option>Admin</option>
              <option>Super Admin</option>
            </select>
            <div v-if="errors.role" class="error">{{ errors.role }}</div>
          </div>

          <div class="form-row">
            <label for="password">Password *</label>
            <input
              id="password"
              v-model.trim="form.password"
              type="password"
              required
              :placeholder="isEditing ? 'Leave blank to keep current password' : ''"
            />
            <div v-if="errors.password" class="error">{{ errors.password }}</div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-outline" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="submitting">
              {{ submitting ? 'Saving...' : (isEditing ? 'Update Manager' : 'Add Manager') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import managerAPI from '@/api/users/managerService' 


const managers = ref([])
const loading = ref(false)
const submitting = ref(false)
const showModal = ref(false)
const isEditing = ref(false)
const currentManagerId = ref(null)

const form = reactive({
  first_name: '',
  last_name: '',
  email_address: '',
  phone_number: '',
  role: 'Manager',
  password: ''
})

const errors = reactive({
  first_name: '',
  last_name: '',
  email_address: '',
  phone_number: '',
  role: '',
  password: ''
})

const message = reactive({
  text: '',
  type: '' 
})

onMounted(async () => {
  await loadManagers()
})

async function loadManagers() {
  loading.value = true
  try {
    const data = await managerAPI.getAll()
    managers.value = Array.isArray(data) ? data : []
  } catch (err) {
    showMessage('Failed to load managers.', 'error')
    console.error('Load managers error:', err)
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

// Helpers
function managerDisplayName(manager) {
  return `${manager.first_name} ${manager.last_name}`.trim()
}

function formatPhoneDisplay(val) {
  if (!val) return '—'
  const normalized = val.replace(/[^\d+]/g, '')
  const digits = normalized.replace('+', '')
  if (digits.length >= 9) {
    const cc = normalized.startsWith('+') ? '+' + digits.slice(0, 2) : ''
    const rest = digits.slice(2)
    const a = rest.slice(0, 3)
    const b = rest.slice(3, 6)
    const c = rest.slice(6, 9)
    const parts = [a, b, c].filter(Boolean)
    return [cc, ...parts].join(' ').trim()
  }
  return val
}

function onPhoneInput(e) {
  let v = e.target.value || ''
  const hasPlus = v.startsWith('+')
  v = v.replace(/[^\d]/g, '')
  const cc = v.slice(0, 2)
  const rest = v.slice(2)
  const p1 = rest.slice(0, 3)
  const p2 = rest.slice(3, 6)
  const p3 = rest.slice(6, 9)
  const pieces = []
  if (cc) pieces.push((hasPlus ? '+' : '+') + cc)
  if (p1) pieces.push(p1)
  if (p2) pieces.push(p2)
  if (p3) pieces.push(p3)
  form.phone_number = pieces.join(' ').trim()
}


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm() {
  clearErrors()
  let valid = true

  if (!form.first_name?.trim()) {
    errors.first_name = 'First name is required'
    valid = false
  }
  if (!form.last_name?.trim()) {
    errors.last_name = 'Last name is required'
    valid = false
  }
  if (!form.email_address?.trim()) {
    errors.email_address = 'Email is required'
    valid = false
  } else if (!emailRegex.test(form.email_address)) {
    errors.email_address = 'Enter a valid email address'
    valid = false
  }
  if (!form.phone_number?.trim()) {
    errors.phone_number = 'Phone number is required'
    valid = false
  } else {
    const digitsOnly = form.phone_number.replace(/[^\d]/g, '')
    if (digitsOnly.length < 9) {
      errors.phone_number = 'Enter a valid phone number'
      valid = false
    }
  }
  if (!form.role) {
    errors.role = 'Role is required'
    valid = false
  }
  if (!isEditing.value && !form.password?.trim()) {
    errors.password = 'Password is required'
    valid = false
  }

  return valid
}

function clearErrors() {
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
}

function showMessage(text, type) {
  message.text = text
  message.type = type
  setTimeout(clearMessage, 4000)
}

function clearMessage() {
  message.text = ''
  message.type = ''
}

function resetForm() {
  form.first_name = ''
  form.last_name = ''
  form.email_address = ''
  form.phone_number = ''
  form.role = 'Manager'
  form.password = ''
  clearErrors()
}

// Edit handler
function editManager(manager) {
  isEditing.value = true
  currentManagerId.value = manager.id
  Object.assign(form, {
    first_name: manager.first_name,
    last_name: manager.last_name,
    email_address: manager.email_address,
    phone_number: manager.phone_number,
    role: manager.role,
    password: '' // don't prefill password
  })
  showModal.value = true
}


async function submitForm() {
  if (!validateForm()) {
    showMessage('Please fix the errors in the form.', 'error')
    return
  }

  submitting.value = true
  try {
    if (isEditing.value) {
     
      const updateData = { ...form }
      if (!updateData.password?.trim()) {
        delete updateData.password
      }
      await managerAPI.update(currentManagerId.value, updateData)
      showMessage('Manager updated successfully!', 'success')
    } else {
      
      await managerAPI.create(form)
      showMessage('Manager added successfully!', 'success')
    }

    
    await loadManagers()
    closeModal()
  } catch (err) {
    showMessage('Operation failed. Please try again.', 'error')
    console.error('Submit error:', err)
  } finally {
    submitting.value = false
  }
}


async function deleteManager(id) {
  if (!confirm('Are you sure you want to delete this manager?')) return

  try {
    await managerAPI.delete(id)
    await loadManagers()
    showMessage('Manager deleted.', 'success')
  } catch (err) {
    showMessage('Failed to delete manager.', 'error')
    console.error('Delete error:', err)
  }
}
</script>

<style scoped>
:root {
  --dark-green: #2d4a2b;
  --lime: #c7e96f;
}

.managers-management {
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

.managers-table {
  width: 100%;
  border-collapse: collapse;
}

.managers-table thead th {
  background: var(--dark-green);
  color: #fff;
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
}

.managers-table tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid #f3f3f3;
  vertical-align: middle;
  font-size: 14px;
}

.managers-table tbody tr:hover {
  background: #fbffef;
}

.empty {
  padding: 24px;
  text-align: center;
  color: #666;
}


.role-badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #c7e96f;
  color: #2d4a2b;
}

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
  .managers-table thead th { font-size: 12px; }
  .managers-table tbody td { font-size: 13px; padding: 10px; }
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