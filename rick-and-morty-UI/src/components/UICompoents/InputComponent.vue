<template>
  <div class="mat-input">
    <input :type="type" :id="id" :value="inputValue" v-on:keyup.enter="updateValue" required />
    <span class="highlight"></span>
    <span class="bar"></span>
    <label>{{ label }}</label>
  </div>
</template>
<script lang="ts">
import type { InputTypes } from '@/models/inputTypes.model';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'InputComponent',
  props: {
    label: String as PropType<string>,
    type: String as PropType<InputTypes>,
    id: String as PropType<string>,
    inputValue: Number as PropType<number>
  },
  emits: ['update:inputValue'],
  setup(props, { emit }) {
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:inputValue', target.value);
      target.value = String(null);
    };

    return {
      updateValue
    };
  }
});
</script>
