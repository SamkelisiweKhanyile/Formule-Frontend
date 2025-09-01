<template>
  <div class="products-view">
    <h1>Skincare Products</h1>
    <div v-if="loading" class="loading">Loading products...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="products.length === 0" class="empty">
      No products found in the database. <br />
      Plan: Seed the database with sample skincare products such as:
      <ul>
        <li>CeraVe Hydrating Cleanser (Category: Cleansers, ID: 1)</li>
        <li>La Roche-Posay Moisturizer (Category: Moisturizers, ID: 2)</li>
        <li>The Ordinary Niacinamide Serum (Category: Serums, ID: 3)</li>
        <li>Neutrogena Sunscreen SPF 50 (Category: Sunscreens, ID: 4)</li>
      </ul>
    </div>
    <div v-else class="product-list">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/business/ProductCard.vue'
import ProductService from '@/api/business/ProductService.js'

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      loading: true,
      error: null
    }
  },
  async created() {
    try {
      this.products = await ApiService.getAllProducts()
    } catch (err) {
      this.error = 'Failed to fetch products: ' + err.message
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.products-view {
  padding: 20px;
  text-align: center;
}
h1 {
  color: #333;
  margin-bottom: 20px;
}
.loading {
  font-size: 1.2em;
  color: #555;
}
.error {
  color: red;
  font-weight: bold;
}
.empty {
  font-size: 1.1em;
  color: #666;
}
.empty ul {
  list-style-type: disc;
  margin: 20px auto;
  text-align: left;
  max-width: 400px;
}
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>