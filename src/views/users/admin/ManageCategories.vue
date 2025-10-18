<template>
  <div class="category-manager">
    <header class="topbar">
      <h2>Categories</h2>
      <button class="add-btn" @click="openModal" aria-haspopup="dialog">+ Add Category</button>
    </header>

    
    <div v-if="message.text" :class="['message', message.type]" role="status">
      <span>{{ message.text }}</span>
      <button class="msg-close" @click="clearMessage" aria-label="Close message">✕</button>
    </div>

    
    <div class="tiles-wrap">
      <div class="tiles-grid">
        <div
          v-for="category in categories"
          :key="category.id"
          class="tile"
          :title="category.description || ''"
        >
          <div class="tile-content">
            <div class="icon-badge" aria-hidden="true">
              <i class="fa fa-folder"></i>
            </div>
            <div class="tile-text">
              <div class="tile-name">{{ category.name }}</div>
              <div class="tile-meta" v-if="typeof category.count !== 'undefined'">
                {{ category.count }} products
              </div>
            </div>
          </div>

          <!-- optional small actions (commented out for now) -->
          <!-- <div class="tile-actions">
            <button class="small-btn">✎</button>
            <button class="small-btn">🗑</button>
          </div> -->
        </div>
      </div>
    </div>

    
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <h3 id="modal-title">Add Category</h3>
          <button class="close" @click="closeModal" aria-label="Close">✕</button>
        </div>

        <form class="modal-body" @submit.prevent="saveCategory" novalidate>
          <div class="form-row">
            <label for="cat-name">Name *</label>
            <input id="cat-name" v-model.trim="form.name" required />
            <div v-if="errors.name" class="error">{{ errors.name }}</div>
          </div>

          <div class="form-row">
            <label for="cat-desc">Description (optional)</label>
            <textarea id="cat-desc" v-model.trim="form.description" rows="3" />
          </div>

          <div class="form-actions">
            <button type="button" class="btn-outline" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import categoryAPI from '@/api/business/categoryService' 


const categories = ref([])
const showModal = ref(false)
const form = reactive({ name: '', description: '' })
const errors = reactive({ name: '' })
const message = reactive({ text: '', type: '' }) // 'success' | 'error'
const loading = ref(false)


onMounted(async () => {
  await loadCategories()
})

async function loadCategories() {
  loading.value = true
  try {
    const data = await categoryAPI.getAll()
    
    categories.value = data.map(cat => ({
      ...cat,
      count: cat.count ?? cat.productCount ?? 0 // adjust field name if needed
    }))
  } catch (error) {
    showMessage('Failed to load categories.', 'error')
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

function validate() {
  clearErrors()
  if (!form.name?.trim()) {
    errors.name = 'Name is required'
    return false
  }
  if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
    return false
  }
  return true
}

async function saveCategory() {
  if (!validate()) {
    showMessage('Please fix form errors.', 'error')
    return
  }

  try {
    const newCategoryData = {
      name: form.name.trim(),
      description: form.description?.trim() || ''
    }

    const savedCategory = await categoryAPI.create(newCategoryData)

    categories.value.unshift({
      ...savedCategory,
      count: savedCategory.count ?? 0
    })

    showMessage(`Category "${savedCategory.name}" added successfully`, 'success')
    closeModal()
  } catch (error) {
    showMessage('Failed to create category. Please try again.', 'error')
  }
}

function resetForm() {
  form.name = ''
  form.description = ''
  clearErrors()
}

function clearErrors() {
  errors.name = ''
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
</script>
<style scoped>
:root{
  --dark-green: #2d4a2b;
  --lime: #c7e96f;
  --tile-bg: #e9f6d9; 
}

.category-manager{
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  color: #222;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.topbar h2 {
  margin: 0;
  color: var(--dark-green);
  font-size: 20px;
}

.add-btn {
  background: var(--dark-green);
  color: #fff;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(45,74,43,0.12);
}
.add-btn:hover { opacity: 0.95; transform: translateY(-1px); }

.message {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  padding:10px 12px;
  border-radius:8px;
  margin-bottom:12px;
}
.message.success { background:#f0fbef; color:#164d2d; border: 1px solid rgba(139,195,74,0.15); }
.message.error { background:#fff6f6; color:#7a1a1a; border: 1px solid rgba(229,62,62,0.12); }
.msg-close {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 12px;
}

.tiles-wrap {
  background: white;
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 6px 30px rgba(0,0,0,0.04);
}

.tiles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.tile {
  background: var(--lime);
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 6px 18px rgba(45,74,43,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform .14s ease, box-shadow .14s ease;
  min-height: 72px;
  overflow: hidden;
}
.tile:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 28px rgba(45,74,43,0.14);
}

.tile-content {
  display:flex;
  align-items:center;
  gap:12px;
  width:100%;
}
.icon-badge {
  min-width:44px;
  min-height:44px;
  border-radius:50%;
  background: rgba(255,255,255,0.9);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:18px;
  color: var(--dark-green);
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
}
.icon-badge .fa { font-size:18px; }

.tile-text {
  display:flex;
  flex-direction:column;
  gap:4px;
  min-width: 0;
}
.tile-name {
  font-weight:700;
  color: #19310f;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tile-meta {
  font-size: 12px;
  color: #234a22;
  opacity: 0.9;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}
.modal {
  width: 100%;
  max-width: 520px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.25);
  overflow: hidden;
}
.modal-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding: 14px 18px;
  border-bottom: 1px solid #f0f0f0;
}
.modal-header h3 { margin:0; color: var(--dark-green); font-size:16px; }
.close {
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.modal-body {
  display: grid;
  padding: 16px 18px;
  gap: 12px;
}
.form-row { display:flex; flex-direction:column; gap:6px; }
.form-row label { font-size: 13px; color: #333; }
.form-row input,
.form-row textarea {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
  resize: vertical;
}
.form-row input:focus,
.form-row textarea:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(199,233,111,0.12);
  border-color: var(--dark-green);
}
.error { color: #b00020; font-size: 12px; margin-top: 4px; }

.form-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:6px; }
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
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

@media (max-width: 980px) {
  .tiles-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .tiles-grid { grid-template-columns: repeat(1, 1fr); }
  .topbar { flex-direction: column; align-items: stretch; gap: 10px; }
  .add-btn { align-self: flex-end; }
}
</style>