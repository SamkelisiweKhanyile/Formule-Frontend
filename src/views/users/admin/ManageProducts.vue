<template>
  <div class="products-view">
    <header class="topbar">
      <h1>Products Management</h1>
      <button class="add-btn" @click="openModal">
        + Add Product
      </button>
    </header>

    <div v-if="message.text" :class="['message', message.type]">
      {{ message.text }}
      <button class="msg-close" @click="clearMessage">✕</button>
    </div>

    <div v-if="loading" class="loading-state">
      Loading products...
    </div>
    <div v-else class="table-wrap">
      <table class="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price (R)</th>
            <th>Stock Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="products.length === 0">
            <td colspan="7" class="empty">No products found.</td>
          </tr>

          <tr v-for="product in products" :key="product.id">
            <td>
              <div v-if="product.image_url" class="product-image" :style="{ backgroundImage: `url(${product.image_url})` }"></div>
              <span v-else class="no-image">—</span>
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.brand }}</td>
            <td>{{ getCategoryName(product.category_id) }}</td>
            <td>R{{ product.price.toFixed(2) }}</td>
            <td>
              <span
                class="stock-badge"
                :class="product.stock_quantity < 50 ? 'low-stock' : 'in-stock'"
              >
                {{ product.stock_quantity < 50 ? 'Low Stock' : 'In Stock' }}
              </span>
            </td>
            <td class="action-cell">
              <button class="btn-icon btn-edit" @click="editProduct(product)">Edit</button>
              <button class="btn-icon btn-delete" @click="deleteProduct(product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

   
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit Product' : 'Add Product' }}</h2>
          <button class="close" @click="closeModal">✕</button>
        </div>

        <form @submit.prevent="submitForm" class="modal-body" novalidate>
          <div class="form-row">
            <label for="name">Product Name *</label>
            <input id="name" v-model.trim="form.name" required />
            <div v-if="errors.name" class="error">{{ errors.name }}</div>
          </div>

          <div class="form-row">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model.trim="form.description"
              placeholder="Optional"
            ></textarea>
          </div>

          <div class="form-row">
            <label for="brand">Brand *</label>
            <input id="brand" v-model.trim="form.brand" required />
            <div v-if="errors.brand" class="error">{{ errors.brand }}</div>
          </div>

          <div class="form-row">
            <label for="category">Category *</label>
            <select id="category" v-model.number="form.category_id" required>
              <option :value="null" disabled>Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
            <div v-if="errors.category_id" class="error">{{ errors.category_id }}</div>
          </div>

          <div class="form-row">
            <label for="image_url">Image URL</label>
            <input
              id="image_url"
              v-model.trim="form.image_url"
              placeholder="Optional"
            />
          </div>

          <div class="form-row">
            <label for="price">Price (R) *</label>
            <input
              id="price"
              v-model.number="form.price"
              type="number"
              min="0"
              step="0.01"
              required
            />
            <div v-if="errors.price" class="error">{{ errors.price }}</div>
          </div>

          <div class="form-row">
            <label for="stock">Stock Quantity *</label>
            <input
              id="stock"
              v-model.number="form.stock_quantity"
              type="number"
              min="0"
              required
            />
            <div v-if="errors.stock_quantity" class="error">{{ errors.stock_quantity }}</div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-outline" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="submitting">
              {{ submitting ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import productAPI from '@/api/business/productService.js'
import categoryAPI from '@/api/business/categoryService.js'

const products = ref([])
const categories = ref([])
const loading = ref(false)
const submitting = ref(false)
const showModal = ref(false)
const isEditing = ref(false)
const currentProductId = ref(null)

const form = reactive({
  name: '',
  description: '',
  brand: '',
  category_id: null,
  image_url: '',
  price: 0,
  stock_quantity: 0,
})

const errors = reactive({
  name: '',
  brand: '',
  category_id: '',
  price: '',
  stock_quantity: '',
})

const message = reactive({
  text: '',
  type: '', 
})

onMounted(async () => {
  await Promise.all([
    loadProducts(),
    loadCategories()
  ])
})

async function loadProducts() {
  loading.value = true
  try {
    const data = await productAPI.getAll()
    products.value = Array.isArray(data) ? data : []
  } catch (err) {
    message.text = 'Failed to load products.'
    message.type = 'error'
    console.error('Product load error:', err)
  } finally {
    loading.value = false
  }
}


async function loadCategories() {
  try {
    const data = await categoryAPI.getAll()
    categories.value = Array.isArray(data) ? data : []
  } catch (err) {
    message.text = 'Failed to load categories.'
    message.type = 'error'
    console.error('Category load error:', err)
    categories.value = [] 
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

function getCategoryName(id) {
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.name : `ID: ${id}`
}

function validateForm() {
  clearErrors()
  let valid = true

  if (!form.name?.trim()) {
    errors.name = 'Product name is required'
    valid = false
  }
  if (!form.brand?.trim()) {
    errors.brand = 'Brand is required'
    valid = false
  }
  if (form.category_id === null || form.category_id === undefined) {
    errors.category_id = 'Please select a category'
    valid = false
  }
  if (form.price <= 0) {
    errors.price = 'Price must be greater than 0'
    valid = false
  }
  if (form.stock_quantity < 0) {
    errors.stock_quantity = 'Stock cannot be negative'
    valid = false
  }

  return valid
}

function clearErrors() {
  errors.name = ''
  errors.brand = ''
  errors.category_id = ''
  errors.price = ''
  errors.stock_quantity = ''
}

function clearMessage() {
  message.text = ''
  message.type = ''
}

function resetForm() {
  form.name = ''
  form.description = ''
  form.brand = ''
  form.category_id = null
  form.image_url = ''
  form.price = 0
  form.stock_quantity = 0
  clearErrors()
}

function editProduct(product) {
  isEditing.value = true
  currentProductId.value = product.id
  Object.assign(form, { ...product })
  showModal.value = true
}

async function submitForm() {
  if (!validateForm()) {
    message.text = 'Please fix the errors in the form.'
    message.type = 'error'
    return
  }

  submitting.value = true
  try {
    if (isEditing.value) {
      await productAPI.update(form)
      message.text = 'Product updated successfully!'
    } else {
      await productAPI.create(form)
      message.text = 'Product added successfully!'
    }
    
    message.type = 'success'
    await loadProducts()
    closeModal()
  } catch (err) {
    message.text = 'Operation failed. Please try again.'
    message.type = 'error'
    console.error('Submit error:', err)
  } finally {
    submitting.value = false
  }
}

async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return
  
  try {
    await productAPI.delete(id)
    message.text = 'Product deleted.'
    message.type = 'success'
    await loadProducts()
  } catch (err) {
    message.text = 'Delete failed. Please try again.'
    message.type = 'error'
    console.error('Delete error:', err)
  }
}
</script>

<style scoped>
:root {
  --dark-green: #2d4a2b;
  --lime: #c7e96f;
}


.products-view {
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


.loading-state {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #666;
}


.table-wrap {
  overflow-x: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.products-table thead th {
  background: var(--dark-green);
  color: #fff;
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
}

.products-table tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid #f3f3f3;
  vertical-align: middle;
  font-size: 14px;
}

.products-table tbody tr:hover {
  background: #fbffef;
}

.empty {
  padding: 24px;
  text-align: center;
  color: #666;
}


.product-image {
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 1px solid #ddd;
}
.no-image {
  display: block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #999;
  font-size: 12px;
}


.stock-badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}
.in-stock { background: #e6f7ea; color: #164d2d; }
.low-stock { background: #fffbe6; color: #5c4a00; }


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
  .products-table thead th { font-size: 12px; }
  .products-table tbody td { font-size: 13px; padding: 10px; }
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