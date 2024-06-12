<template>
  <div class="group">
    <input type="text" required/><span class="highlight"></span
    ><span class="bar"></span>
    <label>Page #</label>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'InputComponent',
    props: []
})
</script>