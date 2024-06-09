<style scoped lang="scss">
ul {
  list-style-type: none;
  li {
    opacity: 0.8;
    border-top: 1px solid;
    border-color: var(--vt-ui-grid-border-color);
    &:hover {
      opacity: 1;
    }
    > a {
      border-left: 1px solid;
      border-right: 1px solid;
      border-color: var(--vt-ui-grid-border-color);
    }
    &:nth-child(odd) {
      justify-content: flex-end;
    }
    &:nth-child(even) {
      justify-content: flex-start;
    }
  }
}
</style>
<template>
  <ul class="">
    <li class="" v-for="character in charStore.$state.data as ICharacter[]" :key="character.id">
      {{ character.name }}
      <img :src="character.image" :alt="character.name" />
    </li>
  </ul>
  <button @click="getPrevCharacters">prev</button>
  <button @click="getNextCharacters">next</button>
</template>
<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ICharacter } from '@/models/character.model';
import { characterStore } from '@/stores/character.store';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const charStore = characterStore();

    charStore.fetchCharacters(1);

    const getNextCharacters = async () => {
      const page = (charStore.$state.paging || 1) + 1;
      charStore.fetchCharacters(page);
    };

    const getPrevCharacters = async () => {
      const page = (charStore.$state.paging || 1) - 1;
      charStore.fetchCharacters(page);
    };

    return {
      charStore,
      getNextCharacters,
      getPrevCharacters
    };
  }
});
</script>
