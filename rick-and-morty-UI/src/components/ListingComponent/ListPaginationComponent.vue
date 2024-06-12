<style scoped lang="scss">
.pagination {
  position: fixed;
  z-index: 12;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: var(--vt-ui-project-panel-bg-color);
  padding: 1em;
  border-radius: 3px;

  p {
    font-size: xx-large;
    letter-spacing: 0.001em;
    text-align: right;
    color: var(--vt-ui-project-secondary-color);
  }

  button {
    background-color: var(--vt-ui-project-accent-color);
    border: none;
    color: var(--vt-ui-project-secondary-color);
    padding: 2em 4em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1em;
    font-weight: 800;
    cursor: pointer;
    text-transform: uppercase;
    &:hover:not(.disabled) {
      background-color: var(--vt-ui-project-secondary-color);
      color: var(--vt-ui-project-accent-color);
    }
    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  @media (max-width: 1024px) {
    position: relative;
    bottom: unset;
    right: unset;
  }
}
</style>
<template>
  <div class="pagination">
    <div class="flex">
      <InputComponent
        class="col-6"
        :type="'number'"
        :id="'pageIndex'"
        :label="'Page #'"
        v-model="value"
        v-on:update:inputValue="keyUpOnEnter($event)"
      />
      <p class="col-6">
        {{ paging }} <b>/ {{ pagesTotal }}</b>
      </p>
    </div>
    <div class="flex">
      <button class="col-6" :class="{ disabled: !((paging || 1) - 1) }" v-on:click="prevClicked">
        Prev
      </button>
      <button class="col-6" :class="{ disabled: paging === pagesTotal }" v-on:click="nextClicked">
        Next
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';
import InputComponent from '../UICompoents/InputComponent.vue';
import type { InputValue } from '@/models/inputTypes.model';

export default defineComponent({
  name: 'ListPaginationComponent',
  props: {
    paging: Number as PropType<number>,
    pagesTotal: Number as PropType<number | null | undefined>
  },
  emits: ['click:getPrev', 'click:getNext', 'keyup:enter'],
  components: { InputComponent },
  setup(props, { emit }) {
    const value = ref(null as InputValue);

    const prevClicked = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('click:getPrev', target.value);
    };

    const nextClicked = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('click:getNext', target.value);
    };

    const keyUpOnEnter = (value: number) => {
      emit('keyup:enter', value);
    };

    return {
      prevClicked,
      nextClicked,
      keyUpOnEnter,
      value
    };
  }
});
</script>