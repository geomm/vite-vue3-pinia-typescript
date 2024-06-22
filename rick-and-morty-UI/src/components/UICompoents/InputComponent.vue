<style scoped lang="scss">
button {
  position: absolute;
  right: 0px;
  top: 0px;
  background-color: var(--vt-ui-project-accent-color);
  color: var(--vt-ui-project-secondary-color);
  padding: 0.5em;
  display: inline-flex;
  &:hover:not(.disabled) {
    background-color: var(--vt-ui-project-secondary-color);
    color: var(--vt-ui-project-accent-color);
    cursor: pointer;
  }
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
<template>
  <div class="mat-input">
    <input :type="type" :id="id" v-model="value" v-on:focusout="updateValue" required />
    <span class="highlight"></span>
    <span class="bar"></span>
    <label :for="label">{{ label }}</label>
    <template v-if="useSubmit">
      <button @click="updateValue(value)" :class="{ disabled: isButtonDisabled }">
        <i class="material-icons">arrow_forward</i>
      </button>
    </template>
  </div>
</template>
<script lang="ts">
import type { InputTypes, InputValue } from '@/models/input-types.model';
import { defineComponent, ref, watch, type PropType } from 'vue';

export default defineComponent({
  name: 'InputComponent',
  props: {
    label: String as PropType<string>,
    type: String as PropType<InputTypes>,
    id: String as PropType<string>,
    inputValue: String as PropType<InputValue>,
    useSubmit: Boolean as PropType<boolean>,
    emitFocusOut: Boolean as PropType<boolean>
  },
  emits: ['update:inputValue', 'submit:inputValue'],
  setup(props, { emit }) {
    const value = ref(props.inputValue);
    const isButtonDisabled = ref(true);

    const updateValue = (event: Event | InputValue | undefined) => {
      if (typeof event === 'number') {
        emit('submit:inputValue', value.value);
        value.value = null;
      } else if (event instanceof Event) {
        emit('update:inputValue', value.value);
      }
      console.log('valval:', value.value);
    };

    watch(value, (newVal) => {
      isButtonDisabled.value = newVal?.toString().trim() === '' || !newVal;
    });

    return {
      updateValue,
      value,
      isButtonDisabled
    };
  }
});
</script>
