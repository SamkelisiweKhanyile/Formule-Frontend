<template>
  <form @submit.prevent="saveAddress" class="address-form">
    <input type="text" placeholder="Street" v-model="street" required />
    <input type="text" placeholder="City" v-model="city" required />
    <input type="text" placeholder="Province" v-model="province" required />
    <input type="text" placeholder="Country" v-model="country" required />
    <input type="text" placeholder="Postal Code" v-model="postalCode" required />
    <input type="text" placeholder="CustomerID" v-model="customerId" required />
    
    <button type="submit">Save</button>
    <button type="submit">Delete</button>
    <p v-if="message" class="message">{{ message }}</p>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AddressService from "@/api/generic/AddressService.js"; 

export default defineComponent({
  name: "AddressForm",
  setup() {
    const street = ref("");
    const city = ref("");
    const province = ref("");
    const country = ref("");
    const postalCode = ref("");
    const customerId = ref("");
    const message = ref("");

    const saveAddress = async () => {
      try {
        const address = {
          street: street.value,
          city: city.value,
          province: province.value,
          country: country.value,
          postalCode: postalCode.value,
        };

        await AddressService.addAddress(address);
        message.value = " Address saved successfully!";
        
        
        street.value = "";
        city.value = "";
        province.value = "";
        country.value = "";
        postalCode.value = "";

      } catch (error) {
        message.value = " Failed to save address!";
        console.error(error);
      }
    };

    return { street, city, province, country, postalCode,customerId, saveAddress, message };
  },
});
</script>

<style scoped>
.address-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
}
.address-form input {
  margin: 5px 0;
  padding: 8px;
}
.address-form button {
  margin-top: 10px;
  padding: 10px;
  background-color: #A98467;
  border: none;
  color: white;
  cursor: pointer;
}
.message {
  margin-top: 10px;
  font-size: 14px;
}
</style>

