<template>
  <div class="mat-input">
    <input
      :type="type"
      :id="id"
      v-model="value"
      v-on:keyup.enter="updateValue"
      v-on:focusout="updateValue"
      required
    />
    <span class="highlight"></span>
    <span class="bar"></span>
    <label :for="label">{{ label }}</label>
    <button v-if="useSubmit">
      <i class="material-icons" @click="updateValue">arrow_forward</i>
    </button>
  </div>
</template>
<script lang="ts">
import type { InputTypes, InputValue } from '@/models/input-types.model';
import { defineComponent, ref, type PropType } from 'vue';

export default defineComponent({
  name: 'InputComponent',
  props: {
    label: String as PropType<string>,
    type: String as PropType<InputTypes>,
    id: String as PropType<string>,
    inputValue: String as PropType<InputValue>,
    useSubmit: Boolean as PropType<boolean>
  },
  emits: ['update:inputValue'],
  setup(props, { emit }) {
    const value = ref(props.inputValue);

    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:inputValue', target.value);
    };

    return {
      updateValue,
      value
    };
  }
});
</script>
