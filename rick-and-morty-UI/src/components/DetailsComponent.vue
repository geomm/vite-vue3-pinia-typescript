<template>
  <section v-if="(charStore.$state.data?.model as ICharacter)">
    <div class="image">
      <img
        :src="(charStore.$state.data?.model as ICharacter).image"
        :alt="(charStore.$state.data?.model as ICharacter).name"
      />
      <img :src="character?.image" :alt="character?.name" />
    </div>
    <div class="info">
      <div class="section">
        <a
          href="javascript:void(0)"
          @click="redirect((charStore.$state.data?.model as ICharacter).id)"
          ><h2>{{ (charStore.$state.data?.model as ICharacter).name || '' }}</h2></a
        >
        <!-- <RouterLink :to="{ name: '(charStore.$state.data?.model as ICharacter)', params: { id: (charStore.$state.data?.model as ICharacter).id } }"
          ><h2>{{ (charStore.$state.data?.model as ICharacter).name || '' }}</h2></RouterLink
        > @NOTE: receivng error on history.back()-->
        <span class="status">
          <span class="status_icon"></span>
          {{ (charStore.$state.data?.model as ICharacter).status || '' }} -
          {{ (charStore.$state.data?.model as ICharacter).species || '' }}
        </span>
      </div>
      <div class="section">
        <span class="text-gray">Last known location: </span>
        <a :href="(charStore.$state.data?.model as ICharacter).location?.url">{{
          (charStore.$state.data?.model as ICharacter).location?.name || ''
        }}</a>
      </div>
      <div class="section">
        <span class="text-gray">First seen in: </span>
        <a :href="(charStore.$state.data?.model as ICharacter).episode?.[0]">That episode</a>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ICharacter } from '@/models/character.model';
import router from '@/router';
import { characterStore } from '@/stores/character.store';
import { defineComponent, onBeforeMount, onBeforeUnmount, reactive } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DetailsComponent',
  setup() {
    const charStore = characterStore();
    const character: ICharacter = reactive({...charStore.$state.data?.model as ICharacter});

    const redirect = (id: number) => {
      router.push({ name: `character`, params: { id: id } });
    };

    const route = useRoute();

    onBeforeMount(() => {
      charStore.fetchCharacter(Number(route.params.id));
    });

    onBeforeUnmount(() => {
      //   charStore.$dispose();
    });

    return {
      charStore,
      character,
      redirect
    };
  }
});
</script>
