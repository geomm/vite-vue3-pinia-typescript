<style scoped lang="scss">
@import '../../assets/scss/vars.scss';
ul {
  list-style-type: none;
  padding-left: unset;
  display: flex;
  flex-flow: row wrap;
  min-width: 100%;
  justify-content: center;
  opacity: 1;
  -webkit-transition: opacity 0.1s ease-in-out;
  -moz-transition: opacity 0.1s ease-in-out;
  transition: opacity 0.1s ease-in-out;
  padding: 6em 0em;
  @media (max-width: $larger) {
    padding: 0em 0em 12em 0em;
  }
  li {
    opacity: 0.9;
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
</style>
<template>
  <ul class="flex" :class="{ 'no-data': charStore.$state.loading }">
    <ListCardComponent
      v-for="character in charStore.$state.data?.results"
      :key="character.id"
      :character="character"
    />
  </ul>
  <ListPaginationComponent
    :paging="charStore.$state.paging"
    :pagesTotal="charStore.$state.pagesTotal"
    :useSubmit="true"
    @click:getPrev="getPrevCharacters"
    @click:getNext="getNextCharacters"
    @keyup:enter="fetchCharactersByPageNumber($event)"
    @button:click="fetchCharactersByPageNumber($event)"
  />
</template>
<script lang="ts">
import { characterStore } from '@/stores/character.store';
import { episodeStore } from '@/stores/episode.store';
import { defineComponent, onMounted } from 'vue';
import ListCardComponent from './ListCardComponent.vue';
import ListPaginationComponent from './ListPaginationComponent.vue';
import { toast } from 'vue3-toastify';
import { toastifyConfiguration } from '@/configs/toastify.config';

export default defineComponent({
  name: 'ListingComponent',
  components: { ListCardComponent, ListPaginationComponent },
  setup() {
    const charStore = characterStore();
    const episStore = episodeStore();

    onMounted(async () => {
      await episStore.fetchAllEpisodes(async () => {
        await charStore.fetchCharacters();
      });
    });

    const getPrevCharacters = () => {
      const page = (charStore.$state.paging || 1) - 1;
      if (!page) {
        toast.warn(`There is nothing before page 1 :)`, toastifyConfiguration);
        return;
      }
      charStore.fetchCharacters(page);
    };

    const getNextCharacters = () => {
      const page = Number(charStore.$state.paging) + 1;
      if (page === Number(charStore.$state.pagesTotal) + 1) {
        toast.warn(`There are no more than ${page - 1} pages :)`, toastifyConfiguration);
        return;
      }
      charStore.fetchCharacters(page);
    };

    const fetchCharactersByPageNumber = (pageIndex: number) => {
      charStore.fetchCharacters(Number(pageIndex));
    };

    return {
      charStore,
      episStore,
      getNextCharacters,
      getPrevCharacters,
      fetchCharactersByPageNumber
    };
  }
});
</script>
