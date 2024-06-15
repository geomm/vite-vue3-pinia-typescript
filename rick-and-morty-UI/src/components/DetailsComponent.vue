<style scoped lang="scss">
@import '../assets/scss/vars.scss';
section {
  font-size: 23px;
  > div {
    @media (max-width: $large) {
      width: 100%;
      max-width: 100%;
    }
  }
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
    h1 {
      margin: 0em 0.1em -0.1em;
    }
    .info {
      text-align: right;
      background-color: $project-panel-bg-color;
      border-radius: $mat-border-radius;
      padding: 2em;
      @media (max-width: $large) {
        margin: auto;
        > * {
          width: 100%;
          max-width: 100%;
          margin: inherit;
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

    &.editing {
      border: 1px solid;
    }
  }
}
</style>

<template>
  <section
    class="details flex col-11"
    :class="{ 'no-data': charStore.$state.loading, editing: charStore.$state.editMode }"
    v-if="charStore.$state.data?.model"
  >
    <button class="prev"><i class="material-icons">arrow_back</i></button>
    <div class="col-6">
      <header class="col-12 flex">
        <div
          class="col-4 image"
          :style="`background-image: url(${charStore.$state.data.model?.image})`"
          :data-attr-title="charStore.$state.data.model?.name"
        ></div>
        <div class="col-8">
          <button class="edit" @click="toggleEditMode"><i class="material-icons">edit</i></button>
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
    <button class="next"><i class="material-icons">arrow_forward</i></button>
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

    const toggleEditMode = () => {
      charStore.updateEditModeState();
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
      redirect,
      toggleEditMode
    };
  }
});
</script>
