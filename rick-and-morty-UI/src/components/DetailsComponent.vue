<style scoped lang="scss">
@import '../assets/scss/vars.scss';
section {
  font-size: 23px;
  &.details {
    flex-flow: column;
    h1 {
      margin: 0em 0.1em -0.1em;
    }
    .info {
      text-align: right;
      background-color: rgb(4 170 168 / 46%); //$project-panel-bg-color;
      border-radius: $mat-border-radius;
      padding: 2em;
    }
    .status {
      font-weight: 900;
      .status_icon {
        height: 1.5rem;
        width: 1.5rem;
        margin-right: 1.375rem;
      }
    }
    .image {
      img {
        width: 100%;
        max-width: 220px;
      }
    }
  }
}
</style>

<template>
  <section
    class="details flex col-11"
    :class="{ 'no-data': charStore.$state.loading }"
    v-if="charStore.$state.data?.model"
  >
    <div class="col-6">
      <div
        class="col-12 flex"
        style="align-items: flex-end; margin: 0px; justify-content: flex-start"
      >
        <div class="image col-3">
          <img :src="charStore.$state.data.model?.image" :alt="charStore.$state.data.model?.name" />
        </div>
        <a :href="charStore.$state.data!.model.url" target="_blank" class="col-9"
          ><h1 class="text-align-right">{{ charStore.$state.data.model?.name || '' }}</h1>
          <StatusComponent
            :status="charStore.$state.data!.model?.status"
            :species="charStore.$state.data!.model?.species"
          />
        </a>
      </div>

      <div class="info col-12">
        <SectionInfoComponent
          :label="'Last known location'"
          :content="charStore.$state.data!.model.location?.name"
          :url="charStore.$state.data!.model.location?.url"
        />

        <SectionInfoComponent
          :label="'First seen in'"
          :content="'That episode'"
          :url="charStore.$state.data!.model.episode?.[0]"
        />

        <SectionInfoComponent
          :label="'Origin'"
          :content="charStore.$state.data!.model.origin?.name"
          :url="charStore.$state.data!.model.origin?.url"
        />

        <SectionInfoComponent :label="'Gender'" :content="charStore.$state.data!.model?.gender" />

        <SectionInfoComponent :label="'Type'" :content="charStore.$state.data!.model?.type" />

        <SectionInfoComponent :label="'Status'" :content="charStore.$state.data!.model?.status" />

        <SectionInfoComponent :label="'Species'" :content="charStore.$state.data!.model?.species" />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import type { ICharacter } from '@/models/character.model';
import router from '@/router';
import { characterStore } from '@/stores/character.store';
import { defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import StatusComponent from './UICompoents/StatusComponent.vue';
import SectionInfoComponent from './UICompoents/SectionInfoComponent.vue';

export default defineComponent({
  name: 'DetailsComponent',
  components: {
    StatusComponent,
    SectionInfoComponent
  },
  setup() {
    const route = useRoute();
    const charStore = characterStore();
    let character: ICharacter = {} as ICharacter;

    const redirect = (id: number) => {
      router.push({ name: `character`, params: { id: id } });
    };

    const updateCharacter = () => {
      character = charStore.$state.data!.model;
      console.log('character:', character);
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
      // character,
      redirect
    };
  }
});
</script>
