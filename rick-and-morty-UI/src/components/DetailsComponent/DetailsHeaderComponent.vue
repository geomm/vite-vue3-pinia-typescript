<style scoped lang="scss">
@import '../../assets/scss/vars.scss';
header {
  align-items: flex-end;
  justify-content: space-between;
  a,
  h1 {
    // margin-right: 0px;
    margin: 0em 0.1em -0.1em;
  }
  a {
    align-items: flex-end;
    display: inline-flex;
    flex-flow: column;
    margin-bottom: 0px;
    .status {
      font-weight: 900;
      margin-top: 0.7em;
      .status_icon {
        height: 1.5rem;
        width: 1.5rem;
        margin-right: 1rem;
      }
    }
    @media (max-width: $large) {
      margin: 1em auto;
    }
  }
  @media (max-width: $xx-large) {
    flex-flow: column;
    > div[class^='col-'] {
      width: 100%;
      max-width: 100%;
    }
  }
  @media (max-width: $large) {
    margin: auto;
    > * {
      width: 100%;
      max-width: 100%;
      margin: inherit;
    }
  }
  @media (max-width: $medium) {
    > div[class^='col-'] {
      margin: auto;
    }
  }
}
.image {
  margin-left: 0px;
  display: flex;
  height: 200px;
  border-radius: 3px;
  background-position: center;
  background-size: cover;
  @media (max-width: $xx-large) {
    margin-right: 0px;
    background-size: unset;
  }
}
button {
  background-color: var(--vt-ui-project-accent-color);
  border: none;
  color: var(--vt-ui-project-secondary-color);
  padding: 2em 4em;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  font-weight: 800;
  cursor: pointer;
  text-transform: uppercase;
  z-index: 1;
  @media (max-width: $large) {
    padding: 1em;
    position: absolute;
    top: 30%;
    &.prev {
      left: 0em;
    }
    &.next {
      right: 0em;
    }
  }
  @media (max-width: $medium) {
    top: unset;
    position: fixed;
    bottom: 0.5em;
    max-height: 3em;
    &.prev {
      left: 0.5em;
    }
    &.next {
      right: 0.5em;
    }
  }
  &.edit {
    padding: 0em;
    border-radius: 50%;
    width: 2em;
    height: 2em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -0.5em;
    top: -1.5em;
    z-index: 1;
  }

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
  <header class="col-12 flex" v-if="state?.name">
    <div
      class="col-4 image"
      :style="`background-image: url(${state?.image})`"
      :data-attr-title="state?.name"
    ></div>
    <div class="col-8">
      <button class="edit" @click="toggleEditMode" v-if="!editMode">
        <i class="material-icons">edit</i>
      </button>
      <a :href="state?.url" target="_blank" class="col-12" v-if="!editMode">
        <h1 class="text-align-right">{{ state?.name || '' }}</h1>

        <StatusComponent :status="state?.status" :species="state?.species" />
      </a>

      <p class="col-12" v-else>
        <InputComponent
          :label="'Name'"
          :type="'text'"
          :id="'Name'"
          :inputValue="editableContent"
          v-on:update:inputValue="titleEdited($event)"
        />
        <StatusComponent :status="state?.status" :species="state?.species" />
      </p>
    </div>
  </header>
</template>

<script lang="ts">
import type { Spieces, Status } from '@/models/character.model';
import { defineComponent, reactive, ref, type PropType } from 'vue';
import StatusComponent from '../UICompoents/StatusComponent.vue';
import InputComponent from '../UICompoents/InputComponent.vue';

export default defineComponent({
  name: 'DetailsHeaderComponent',
  props: {
    // character: {} as PropType<Partial<ICharacter>>,
    name: String as PropType<string>,
    image: String as PropType<string>,
    status: String as PropType<Status>,
    species: String as PropType<Spieces>,
    url: String as PropType<string>,
    editMode: Boolean as PropType<boolean>,
    content: String as PropType<string>
  },
  components: {
    StatusComponent,
    InputComponent
  },
  emits: ['edit:click', 'section:edit'],
  setup(props, { emit }) {
    const state = reactive(props);
    // const state = reactive<Partial<ICharacter>>(props.character || ({} as Partial<ICharacter>));
    const editableContent = ref(state.name);

    const titleEdited = (value: string) => {
      console.log('>>> valueChange: ', value, editableContent.value);
      emit('section:edit', value);
    };

    const toggleEditMode = (event: Event) => {
      emit('edit:click', event);
    };

    return {
      state,
      toggleEditMode,
      editableContent,
      titleEdited
    };
  }
});
</script>
