<style scoped lang="scss">
@import '../assets/scss/vars.scss';
section {
  font-size: 23px;
  &.details {
    flex-flow: row wrap;
    justify-content: space-between;
    header {
      align-items: flex-end;
      justify-content: space-between;
      a,
      h1 {
        margin-right: 0px;
      }
      a {
        align-items: flex-end;
        display: inline-flex;
        flex-flow: column;
        .status {
          font-weight: 900;
          margin-top: 0.7em;
          .status_icon {
            height: 1.5rem;
            width: 1.5rem;
            margin-right: 1rem;
          }
        }
      }
    }
    h1 {
      margin: 0em 0.1em -0.1em;
    }
    .info {
      text-align: right;
      background-color: $project-panel-bg-color;
      border-radius: $mat-border-radius;
      padding: 2em;
    }

    .image {
      margin-left: 0px;
      display: flex;
      height: 200px;
      border-radius: 3px;
      background-position: center;
      background-size: cover;

      img {
        width: 100%;
        max-width: 220px;
      }
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
  }
}
</style>

<template>
  <section
    class="details flex col-11"
    :class="{ 'no-data': charStore.$state.loading }"
    v-if="charStore.$state.data?.model"
  >
    <button class="prev"><i class="material-icons">arrow_back</i></button>
    <div class="col-6">
      <header class="col-12 flex">
        <div
          class="image col-3"
          :style="`background-image: url(${charStore.$state.data.model?.image})`"
          :data-attr-title="charStore.$state.data.model?.name"
        ></div>
        <div class="col-9">
          <button class="edit"><i class="material-icons">edit</i></button>
          <a :href="charStore.$state.data!.model.url" target="_blank" class="col-12"
            ><h1 class="text-align-right">{{ charStore.$state.data.model?.name || '' }}</h1>
            <StatusComponent
              :status="charStore.$state.data!.model?.status"
              :species="charStore.$state.data!.model?.species"
            />
          </a>
        </div>
      </header>

      <div class="info col-12">
        <SectionInfoComponent
          :label="'Last known location'"
          :content="charStore.$state.data!.model.location?.name"
          :url="charStore.$state.data!.model.location?.url"
          :icon="'location_on'"
        />

        <SectionInfoComponent
          :label="'First seen in'"
          :content="'That episode'"
          :url="charStore.$state.data!.model.episode?.[0]"
          :icon="'movie'"
        />

        <SectionInfoComponent
          :label="'Origin'"
          :content="charStore.$state.data!.model.origin?.name"
          :url="charStore.$state.data!.model.origin?.url"
          :icon="'public'"
        />

        <SectionInfoComponent
          :label="'Gender'"
          :content="charStore.$state.data!.model?.gender"
          :icon="'wc'"
        />

        <SectionInfoComponent
          :label="'Type'"
          :content="charStore.$state.data!.model?.type"
          :icon="'category'"
        />

        <SectionInfoComponent
          :label="'Status'"
          :content="charStore.$state.data!.model?.status"
          :icon="'how_to_reg'"
        />

        <SectionInfoComponent
          :label="'Species'"
          :content="charStore.$state.data!.model?.species"
          :icon="'pets'"
        />
      </div>
    </div>
    <button class="prev"><i class="material-icons">arrow_forward</i></button>
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
