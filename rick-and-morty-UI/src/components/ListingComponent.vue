<style scoped lang="scss">
ul {
  list-style-type: none;
  padding-left: unset;
  display: flex;
  flex-flow: row wrap;
  min-width: 100%;
  justify-content: center;
  
}
</style>
<template>
  <ul class="">
    <ListCardComponent
      v-for="character in (charStore.$state.data?.results as ICharacter[])"
      :key="character.id"
      :character="character"
    />
  </ul>
  <button @click="getPrevCharacters">prev</button>
  <button @click="getNextCharacters">next</button>
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
