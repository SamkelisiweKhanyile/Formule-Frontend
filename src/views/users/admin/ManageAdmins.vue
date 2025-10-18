<template>
  <div class="admin-view">
    <header class="topbar">
      <h1>Admin Management</h1>
      <button class="add-btn" @click="openModal">
        + Add Admin
      </button>
    </header>

    
    <div v-if="message.text" :class="['message', message.type]">
      {{ message.text }}
      <button class="msg-close" @click="clearMessage">✕</button>
    </div>

    
    <div class="table-wrap">
      <table class="admins-table">
        <thead>
          <tr>
            <th>Admin ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="admins.length === 0">
            <td colspan="5" class="empty">No admins yet.</td>
          </tr>

          <tr v-for="admin in admins" :key="admin.id">
            <td>{{ admin.id }}</td>
            <td>{{ adminDisplayName(admin) }}</td>
            <td>{{ admin.email }}</td>
            <td>{{ formatPhoneDisplay(admin.phone) }}</td>
            <td>
              <span
                class="role-badge"
                :class="roleClass(admin.role)"
                :title="admin.role"
              >
                {{ admin.role }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>Add Admin</h2>
          <button class="close" @click="closeModal">✕</button>
        </div>

        <form @submit.prevent="submitForm" class="modal-body" novalidate>
          <div class="form-row">
            <label for="firstName">First Name *</label>
            <input id="firstName" v-model.trim="form.firstName" required />
            <div v-if="errors.firstName" class="error">{{ errors.firstName }}</div>
          </div>

          <div class="form-row">
            <label for="lastName">Last Name *</label>
            <input id="lastName" v-model.trim="form.lastName" required />
            <div v-if="errors.lastName" class="error">{{ errors.lastName }}</div>
          </div>

          <div class="form-row">
            <label for="email">Email Address *</label>
            <input id="email" v-model.trim="form.email" required />
            <div v-if="errors.email" class="error">{{ errors.email }}</div>
          </div>

          <div class="form-row">
            <label for="phone">Phone Number *</label>
            <input
              id="phone"
              v-model="form.phone"
              @input="onPhoneInput"
              placeholder="+27 123 456 789"
              required
            />
            <div v-if="errors.phone" class="error">{{ errors.phone }}</div>
          </div>

          <div class="form-row">
            <label for="role">Role</label>
            <select id="role" v-model="form.role">
              <option>Admin</option>
              <option>Super Admin</option>
              <option>Moderator</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-outline" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-primary">Add Admin</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import adminAPI from '@/api/users/adminService' 


const admins = ref([])
const loading = ref(false)
const submitting = ref(false)
const showModal = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'Admin'
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

const message = reactive({
  text: '',
  type: '' 
})


onMounted(async () => {
  await loadAdmins()
})

async function loadAdmins() {
  loading.value = true
  try {
    const data = await adminAPI.getAll()
    admins.value = Array.isArray(data) ? data : []
  } catch (err) {
    showMessage('Failed to load admins.', 'error')
    console.error('Load admins error:', err)
  } finally {
    loading.value = false
  }
}


function openModal() {
  resetForm()
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  clearErrors()
}

// Helpers
function adminDisplayName(admin) {
  return `${admin.firstName} ${admin.lastName}`.trim()
}

function roleClass(role) {
  if (role === 'Super Admin') return 'role-super'
  if (role === 'Admin') return 'role-admin'
  if (role === 'Moderator') return 'role-moderator'
  return ''
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
  form.phone = pieces.join(' ').trim()
}


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm() {
  clearErrors()
  let valid = true

  if (!form.firstName?.trim()) {
    errors.firstName = 'First name is required'
    valid = false
  }
  if (!form.lastName?.trim()) {
    errors.lastName = 'Last name is required'
    valid = false
  }
  if (!form.email?.trim()) {
    errors.email = 'Email is required'
    valid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Enter a valid email address'
    valid = false
  }
  if (!form.phone?.trim()) {
    errors.phone = 'Phone number is required'
    valid = false
  } else {
    const digitsOnly = form.phone.replace(/[^\d]/g, '')
    if (digitsOnly.length < 9) {
      errors.phone = 'Enter a valid phone number'
      valid = false
    }
  }

  return valid
}

function clearErrors() {
  errors.firstName = ''
  errors.lastName = ''
  errors.email = ''
  errors.phone = ''
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
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
  form.role = 'Admin'
  clearErrors()
}


async function submitForm() {
  if (!validateForm()) {
    showMessage('Please fix the errors in the form.', 'error')
    return
  }

  submitting.value = true
  try {
    // Prepare data for backend
    const adminData = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      role: form.role
    }

   
    const newAdmin = await adminAPI.create(adminData)

    
    admins.value.unshift(newAdmin)

    showMessage('Admin added successfully.', 'success')
    closeModal()
  } catch (err) {
    showMessage('Failed to add admin. Please try again.', 'error')
    console.error('Create admin error:', err)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
:root {
  --dark-green: #2d4a2b;
  --lime: #c7e96f;
  --gold: #d4af37;
  --admin-green: #8bc34a;
  --mod-green: #cddc39;
}


.admin-view {
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

.admins-table {
  width: 100%;
  border-collapse: collapse;
}

.admins-table thead th {
  background: var(--dark-green);
  color: #fff;
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
}

.admins-table tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid #f3f3f3;
  vertical-align: middle;
  font-size: 14px;
}

.admins-table tbody tr:hover {
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
  color: #111;
}
.role-super { background: var(--gold); color:#2b2b2b; }
.role-admin { background: var(--admin-green); color:#16320d; }
.role-moderator { background: var(--mod-green); color:#16320d; }


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


@media (max-width: 720px) {
  .modal { max-width: 95%; }
  .admins-table thead th { font-size: 12px; }
  .admins-table tbody td { font-size: 13px; padding: 10px; }
  .topbar { flex-direction: column; align-items: stretch; gap: 10px; }
}
</style>