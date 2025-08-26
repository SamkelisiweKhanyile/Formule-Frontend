import { defineStore } from 'pinia';

export const useBusinessStore = defineStore('business', {
  state: () => ({
    cart: [],
    products: [],
    categories: []
  }),
  actions: {
    addToCart(product) {
      this.cart.push(product);
    },
    setProducts(products) {
      this.products = products;
    },
    setCategories(categories) {
      this.categories = categories;
    }
  }
});
