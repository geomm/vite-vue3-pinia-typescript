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
  }
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
<template>
  <div class="mat-input">
    <input
      :type="type"
      :id="id"
      v-model="value"
      v-on:focusout="updateValue"
      required
      @input="onUserInput"
    />
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
import { defineComponent, nextTick, onMounted, ref, type PropType } from 'vue';

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
    const shouldUseSubmit = ref(props.useSubmit);
    const isButtonDisabled = ref(true);

    const updateValue = (event: Event | InputValue | undefined) => {
      if (!shouldUseSubmit.value) {
        const target = (event as Event).target as HTMLInputElement;
        emit('update:inputValue', target.value);
      } else {
        if (!isButtonDisabled.value) {
          emit('update:inputValue', value);
        }
      }
    };

    const onUserInput = () => {
      isButtonDisabled.value = value.value?.toString().trim() === '';
    };

    onMounted(async () => {
      await nextTick();
    });

    return {
      updateValue,
      value,
      onUserInput,
      isButtonDisabled,
      shouldUseSubmit
    };
  }
});
</script>
