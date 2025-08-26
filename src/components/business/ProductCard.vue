<template>
  <div>{{ product.name }} - ${{ product.price }}
    <button @click="$emit('add-to-cart', product)">Add</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  props: {
    product: {
      type: Object as PropType<{ id:number; name:string; price:number }>,
      required: true
    }
  }
});
</script>
