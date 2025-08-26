export default {
  cart: [],
  addToCart(product) { this.cart.push(product); },
  getCart() { return this.cart; }
};
