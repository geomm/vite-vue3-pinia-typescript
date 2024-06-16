<style scoped lang="scss">
@import '../../assets/scss/vars.scss';
section {
  font-size: 1.3rem;
  > div {
    @media (max-width: $large) {
      width: 100%;
      max-width: 100%;
    }
  }
  &.details {
    flex-flow: row wrap;
    justify-content: space-between;
    .info {
      text-align: right;
      background-color: $project-panel-bg-color;
      border-radius: $mat-border-radius;
      padding: 2em;
      @media (max-width: $large) {
        margin: auto;
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
  }
}
</style>

<template>
  <section
    class="details flex col-11"
    :class="{ 'no-data': charStore.$state.loading, editing: charStore.$state.editMode }"
    v-if="charStore.$state.data?.model"
  >
    <button
      class="prev"
      :class="{ disabled: charStore.$state.editMode }"
      @click="redirect((Number(charStore.$state.data.model.id) || 1) - 1)"
    >
      <i class="material-icons">arrow_back</i>
    </button>
    <div class="col-6">
      <!-- :character="charStore.$state.data.model" -->
      <DetailsHeaderComponent
        v-model:name="charStore.$state.data.model.name"
        v-model:image="charStore.$state.data.model.image"
        v-model:status="charStore.$state.data.model.status"
        v-model:specied="charStore.$state.data.model.species"
        v-model:url="charStore.$state.data.model.url"
        :editMode="charStore.$state.editMode"
        @edit:click="toggleEditMode"
      />

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
          :editable="charStore.$state.editMode"
          @section:edit="tmpKeepProp('gender', $event)"
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
          :editable="charStore.$state.editMode"
          @section:edit="tmpKeepProp('species', $event)"
        />
        <div class="flex" v-if="charStore.$state.editMode">
          <button class="cancel col-6 ml0" @click="toggleEditMode">
            Cancel<i class="material-icons">close</i>
          </button>
          <button class="submit col-6 mr0" @click="submitChanges">
            Submit<i class="material-icons">check</i>
          </button>
        </div>
      </div>
    </div>
    <button
      class="next"
      :class="{ disabled: charStore.$state.editMode }"
      @click="redirect(Number(charStore.$state.data.model.id) + 1)"
    >
      <i class="material-icons">arrow_forward</i>
    </button>
  </section>
</template>
<script lang="ts">
import type { ICharacter } from '@/models/character.model';
import router from '@/router';
import { characterStore } from '@/stores/character.store';
import { defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import type { EditableModelProperties } from '@/models/store.model';
import SectionInfoComponent from '../UICompoents/SectionInfoComponent.vue';
import DetailsHeaderComponent from './DetailsHeaderComponent.vue';

export default defineComponent({
  name: 'DetailsComponent',
  components: {
    DetailsHeaderComponent,
    SectionInfoComponent
  },
  setup() {
    const route = useRoute();
    const charStore = characterStore();
    let character: ICharacter = {} as ICharacter;
    let tmpCharacter: Partial<ICharacter> = {};

    const redirect = (id: number) => {
      console.log('redirect clicked: ', id);
      router.push({ name: `character`, params: { id: id } });
    };

    const updateCharacter = () => {
      character = charStore.$state.data!.model;
      console.log('character:', character);
    };

    const toggleEditMode = () => {
      charStore.updateEditModeState();
    };

    const tmpKeepProp = (key: EditableModelProperties, value: string) => {
      tmpCharacter[key as EditableModelProperties] = value;
      console.log('>> new partial model to merge: ', tmpCharacter);
    };

    const submitChanges = () => {
      const newCharacterState = {
        ...character,
        ...tmpCharacter
      };
      charStore.setCharacterState(newCharacterState);
      // updateCharacter();
      console.log('Changes submitted', charStore.$state.data!.model);
      toggleEditMode();
    };

    onBeforeMount(() => {
      charStore.fetchCharacter(Number(route.params.id)).then(() => {
        updateCharacter();
      });
    });

    onBeforeUnmount(() => {
      charStore.resetCharacterState();
    });

    onBeforeRouteLeave((to, from, next) => {
      if (charStore.$state.editMode) {
        if (confirm('Are you sure? Any changes will be lost.')) {
          next();
        } else {
          next(false);
        }
        return;
      }
      next();
    });

    return {
      charStore,
      // character,
      redirect,
      toggleEditMode,
      submitChanges,
      tmpKeepProp
    };
  }
});
</script>
