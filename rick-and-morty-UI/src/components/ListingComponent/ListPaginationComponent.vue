<style scoped lang="scss">
@import '../../assets/scss/vars.scss';
.pagination {
  position: fixed;
  z-index: 12;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: var(--vt-ui-project-panel-bg-color);
  padding: 1em;
  border-radius: 3px;

  > div:first-child {
    padding-bottom: 0.4em;
  }

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
    @media (max-width: $small) {
      padding: 1em;
    }
  }
  @media (max-width: $larger) {
    position: fixed;
    bottom: 0px;
    right: 0px;
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
  @media (max-width: $medium) {
    flex-flow: column;
  }
  .flex {
    @media (max-width: $medium) {
      flex-flow: row;
    }
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
        :inputValue="value"
        :validations="`${availableValidations.MINNUMBER}:0, ${availableValidations.MAXNUMBER}:${pagesTotal}`"
        :useSubmit="useSubmit"
        v-on:submit:inputValue="getResultsAction($event)"
      />
      <p class="col-6">
        <b> {{ paging }}</b> / {{ pagesTotal }}
      </p>
    </div>
    <div class="flex">
      <button class="col-6" :class="{ disabled: !((paging || 1) - 1) }" v-on:click="prevClicked">
        <i class="material-icons">arrow_back</i>
      </button>
      <button class="col-6" :class="{ disabled: paging === pagesTotal }" v-on:click="nextClicked">
        <i class="material-icons">arrow_forward</i>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, type PropType, type Ref } from 'vue';
import InputComponent from '../UICompoents/InputComponent.vue';
import type { InputValue } from '@/models/input-types.model';
import { projectAvailableValidations } from '@/constants/input.constants';

export default defineComponent({
  name: 'ListPaginationComponent',
  props: {
    paging: Number as PropType<number>,
    pagesTotal: Number as PropType<number | null | undefined>,
    useSubmit: Boolean as PropType<boolean>
  },
  emits: ['click:getPrev', 'click:getNext', 'keyup:enter', 'button:click'],
  components: { InputComponent },
  setup(props, { emit }) {
    const value = ref(null as InputValue);
    const availableValidations = projectAvailableValidations;

    const prevClicked = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('click:getPrev', target.value);
    };

    const nextClicked = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('click:getNext', target.value);
    };

    const getResultsAction = (value: number) => {
      if (typeof value === 'object') {
        emit('button:click', (value as Ref<InputValue>).value?.toString());
      } else {
        emit('keyup:enter', value);
      }
    };

    return {
      availableValidations,
      value,
      prevClicked,
      nextClicked,
      getResultsAction
    };
  }
});
</script>
