<style scoped lang="scss">
@import '../../assets/scss/vars.scss';
.mat-input {
  position: relative;
  margin: 1em 0;

  label {
    color: $project-secondary-color;
    font-size: 1em;
    font-weight: bold;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: $mat-trans-time ease all;
  }

  .bar {
    position: relative;
    display: block;
    width: $mat-width;
    &:before {
      content: '';
      height: 2px;
      width: 0;
      bottom: 0px;
      position: absolute;
      background: $project-secondary-color;
      transition: $mat-trans-time ease all;
      left: 0%;
    }
  }

  input {
    &:focus {
      outline: none;
    }
    &:focus ~ label,
    &:valid ~ label {
      top: -14px;
      font-size: 12px;
      color: $project-secondary-color;
    }
    &:focus ~ .bar:before {
      width: $mat-width;
    }
  }

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
  .validation-message {
    font-size: 0.6em;
    font-weight: 400;
    color: $project-secondary-color;
    position: absolute;
    right: 0.3em;
    margin-top: 0.1em;
  }
}
</style>
<template>
  <div class="mat-input">
    <input :type="type" :id="id" v-model="value" v-on:focusout="updateValue" required />
    <span class="highlight"></span>
    <span class="bar"></span>
    <label :for="label">{{ label }}</label>
    <template v-if="vuelidate?.value.$dirty && vuelidate?.value.$invalid">
      <span v-for="error in vuelidate?.value.$errors" :key="error.$uid" class="validation-message">
        {{ id }}: {{ error.$message }}
      </span>
    </template>
    <template v-if="useSubmit">
      <button @click="updateValue(value)" :class="{ disabled: isButtonDisabled }">
        <i class="material-icons">arrow_forward</i>
      </button>
    </template>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, type PropType } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { parseValidations, sanitizeInput } from '@/helpers/input.helpers';
import type { InputTypes, InputValue } from '@/models/input-types.model';
import type { IValidation } from '@/models/validation.model';

export default defineComponent({
  name: 'InputComponent',
  props: {
    label: String as PropType<string>,
    type: String as PropType<InputTypes>,
    id: String as PropType<string>,
    inputValue: null as unknown as PropType<InputValue>,
    useSubmit: Boolean as PropType<boolean>,
    emitFocusOut: Boolean as PropType<boolean>,
    validations: String as PropType<string>
  },
  emits: ['update:inputValue', 'submit:inputValue', 'input-validation'],
  setup(props, { emit }) {
    const isButtonDisabled = ref(true);
    const value = ref(props.inputValue);
    const inputState = reactive({
      value
    });
    let availableValidations = parseValidations(String(props.validations));

    const updateValue = (event: Event | InputValue | undefined) => {
      if (typeof event === 'number' && !vuelidate!.value.$invalid) {
        emit('submit:inputValue', sanitizeInput(value.value));
        value.value = null;
      } else if (event instanceof Event) {
        emit('update:inputValue', sanitizeInput(value.value));
      }
    };

    const adjustValidation = (): { [key: string]: IValidation | boolean } => {
      let validations = {};
      availableValidations = parseValidations(String(props.validations));
      availableValidations.forEach((validation: IValidation) => {
        validations = { ...validation, ...validations };
      });
      return { ...validations, $autoDirty: true };
    };

    const vuelidationRules = computed(() => {
      return {
        value: adjustValidation()
      };
    });

    const vuelidate = availableValidations?.length
      ? useVuelidate(vuelidationRules, inputState)
      : null;

    watch(value, (newVal) => {
      isButtonDisabled.value =
        newVal?.toString().trim() === '' || !newVal || vuelidate!.value.$invalid;
      if (vuelidate) {
        emit('input-validation', vuelidate.value);
      }
    });

    return {
      value,
      isButtonDisabled,
      updateValue,
      vuelidate
    };
  }
});
</script>
