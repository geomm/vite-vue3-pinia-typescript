<style scoped lang="scss">
ul {
  list-style-type: none;
  padding-left: unset;
  display: flex;
  flex-flow: row wrap;
  min-width: 100%;
  justify-content: center;
  li {
    opacity: 0.8;
    border-top: 1px solid;
    border-color: var(--vt-ui-grid-border-color);
    &:hover {
      opacity: 1;
    }
    &:nth-child(odd) {
      justify-content: flex-end;
    }
    &:nth-child(even) {
      justify-content: flex-start;
    }
  }
}
.buttons-wrap {
  position: fixed;
  z-index: 12;
  bottom: 1rem;
  right: 2rem;
  @media (max-width: 1024px) {
    position: relative;
    bottom: unset;
    right: unset;
  }
}
</style>
<template>
  <ul class="">
    <ListCardComponent
      v-for="character in charStore.$state.data?.results as ICharacter[]"
      :key="character.id"
      :character="character"
    />
  </ul>
  <div class="buttons-wrap">
    <button @click="getPrevCharacters">prev</button>
    <button @click="getNextCharacters">next</button>
  </div>
</template>
<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ICharacter } from '@/models/character.model';
import { characterStore } from '@/stores/character.store';
import { defineComponent, onMounted } from 'vue';
import ListCardComponent from '../components/ListCardComponent.vue';

export default defineComponent({
  name: 'ListingComponent',
  components: { ListCardComponent },
  setup() {
    const charStore = characterStore();

    onMounted(() => {
      charStore.fetchCharacters(1);
    });

    const getNextCharacters = () => {
      const page = (charStore.$state.paging || 1) + 1;
      charStore.fetchCharacters(page);
    };

    const getPrevCharacters = () => {
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
