<template>
  <section v-if="charStore.$state.data?.model">
    <div class="image">
      <img :src="charStore.$state.data.model?.image" :alt="charStore.$state.data.model?.name" />
    </div>
    <div class="info">
      <div class="section">
        <a @click="redirect(charStore.$state.data.model.id)"
          ><h2>{{ charStore.$state.data.model.name }}</h2></a
        >
        <!-- <RouterLink
          :to="{
            name: charStore.$state.data.model?.name,
            params: { id: Number(charStore.$state.data.model?.id) }
          }"
          ><h2>{{ charStore.$state.data!.model?.name }}</h2></RouterLink
        > -->
        <!-- @NOTE:  receivng error -->
        <span class="status">
          <span class="status_icon"></span>
          {{ charStore.$state.data!.model?.status }} -
          {{ charStore.$state.data!.model?.species }}
        </span>
      </div>
      <div class="section">
        <span class="text-gray">Last known location: </span>
        <a :href="charStore.$state.data!.model.location?.url" target="_blank">{{
          charStore.$state.data!.model.location?.name
        }}</a>
      </div>
      <div class="section">
        <span class="text-gray">First seen in: </span>
        <a :href="charStore.$state.data!.model.episode?.[0]" target="_blank">That episode</a>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ICharacter } from '@/models/character.model';
import router from '@/router';
import { characterStore } from '@/stores/character.store';
import { defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DetailsComponent',
  setup() {
    const route = useRoute();
    const charStore = characterStore();
    let character: ICharacter = {} as ICharacter;

    const redirect = (id: number) => {
      router.push({ name: `character`, params: { id: id } });
    };

    const updateCharacter = () => {
      character = charStore.$state.data!.model;
    };

    onBeforeMount(() => {
      charStore.fetchCharacter(Number(route.params.id)).then(() => {
        updateCharacter();
      });
    });

    onBeforeUnmount(() => {
      charStore.resetCharacterState();
    });

    return {
      charStore,
      character,
      redirect
    };
  }
});
</script>
