<template>
  <form>
    <input type="text" placeholder="Street" v-model="street" />
    <input type="text" placeholder="City" v-model="city" />
    <input type="text" placeholder="Postal Code" v-model="postalCode" />
    <button type="submit">Save</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const street = ref('');
    const city = ref('');
    const postalCode = ref('');
    return { street, city, postalCode };
  }
});
</script>
