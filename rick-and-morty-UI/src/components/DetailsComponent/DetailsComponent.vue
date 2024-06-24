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
        &:not(.cancel):not(.submit) {
          position: absolute;
        }
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
        &:not(.cancel):not(.submit) {
          position: fixed;
        }
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
    v-if="character"
  >
    <button
      class="prev"
      :class="{ disabled: charStore.$state.editMode || charStore.$state.detailsPaging === 1 }"
      @click="goPrev"
    >
      <i class="material-icons">arrow_back</i>
    </button>
    <div class="col-6">
      <DetailsHeaderComponent
        v-model:name="character.name"
        v-model:image="character.image"
        v-model:status="character.status"
        v-model:species="character.species"
        v-model:url="character.url"
        :editMode="charStore.$state.editMode"
        @edit:click="toggleEditMode(!charStore.$state.editMode)"
        @section:edit="tmpKeepProp('name', $event)"
        v-on:input-validation="isValid"
      />

      <div class="info col-12">
        <SectionInfoComponent
          :label="'Last known location'"
          :content="character.location?.name"
          :url="character.location?.url"
          :icon="'location_on'"
          :editMode="charStore.$state.editMode"
        />

        <SectionInfoComponent
          :label="'First seen in'"
          :content="episodeTitle(character.episode?.[0])"
          :url="character.episode?.[0]"
          :icon="'movie'"
          :editMode="charStore.$state.editMode"
        />

        <SectionInfoComponent
          :label="'Origin'"
          :content="character.origin?.name"
          :url="character.origin?.url"
          :icon="'public'"
          :editMode="charStore.$state.editMode"
        />

        <SectionInfoComponent
          :label="'Gender'"
          :content="character.gender"
          :icon="'wc'"
          :editable="charStore.$state.editMode"
          :validations="availableValidations.REQUIRED"
          @section:edit="tmpKeepProp('gender', $event)"
          v-on:input-validation="isValid"
        />

        <SectionInfoComponent :label="'Type'" :content="character.type" :icon="'category'" />

        <SectionInfoComponent :label="'Status'" :content="character.status" :icon="'how_to_reg'" />

        <SectionInfoComponent
          :label="'Species'"
          :content="character.species"
          :icon="'pets'"
          :editable="charStore.$state.editMode"
          :validations="availableValidations.REQUIRED"
          @section:edit="tmpKeepProp('species', $event)"
          v-on:input-validation="isValid"
        />
        <div class="flex" v-if="charStore.$state.editMode">
          <button class="cancel col-6 ml0" @click="toggleEditMode(false)">
            Cancel<i class="material-icons">close</i>
          </button>
          <button
            class="submit col-6 mr0"
            @click="submitChanges"
            :class="{ disabled: !validInput }"
          >
            Submit<i class="material-icons">check</i>
          </button>
        </div>
      </div>
    </div>
    <button
      class="next"
      :class="{
        disabled: charStore.$state.editMode || charStore.$state.detailsPaging === totalCharacters()
      }"
      @click="goNext"
    >
      <i class="material-icons">arrow_forward</i>
    </button>
  </section>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, ref, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import router from '@/router';
import type { Validation } from '@vuelidate/core';
import { toast } from 'vue3-toastify';
import { toastifyConfiguration } from '@/configs/toastify.config';
import { fetchFromStorage } from '@/helpers/storage.helper';
import { projectAvailableValidations } from '@/constants/input.constants';
import type { ICharacter } from '@/models/character.model';
import type { EditableModelProperties } from '@/models/store.model';
import { characterStore } from '@/stores/character.store';
import { episodeStore } from '@/stores/episode.store';
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
    const character = ref();
    let tmpCharacter: Partial<ICharacter> = {};

    const episStore = episodeStore();
    const validInput = ref(true);
    const availableValidations = projectAvailableValidations;

    const redirect = (id: number) => {
      router.push({ name: `character`, params: { id: id } });
    };

    const goNext = async () => {
      if (!charStore.$state.editMode) {
        if (charStore.$state.detailsPaging === totalCharacters()) {
          toast.warn(`There is nothing after page ${totalCharacters()}`, toastifyConfiguration);
          return;
        }
        charStore.incrementDetailsPage();
        redirect(Number(charStore.$state.detailsPaging));
      }
    };

    const goPrev = async () => {
      if (!charStore.$state.editMode) {
        if (charStore.$state.detailsPaging === 1) {
          toast.warn(
            `There is nothing before page ${charStore.$state.detailsPaging} :)`,
            toastifyConfiguration
          );
          return;
        }
        charStore.decrementDetailsPage();
        redirect(Number(charStore.$state.detailsPaging));
      }
    };

    const totalCharacters = (): number => {
      return charStore.$state.totalCount || Number(fetchFromStorage('total_characters'));
    };

    const episodeTitle = (url: string): string => {
      return episStore.getEpisodeTitle(url);
    };

    const isValid = (arg: Validation) => {
      validInput.value = !arg.$invalid;
    };

    const toggleEditMode = (value?: boolean) => {
      charStore.updateEditModeState(value);
      if (value) console.log('Details toggle edit: ', character.value);
    };

    const tmpKeepProp = (key: EditableModelProperties, value: string) => {
      tmpCharacter[key as EditableModelProperties] = value;
    };

    const submitChanges = async () => {
      if (validInput.value) {
        const newCharacterState = {
          ...character.value,
          ...tmpCharacter
        };
        charStore.setCharacterState(newCharacterState as ICharacter);
        charStore.updateEditModeState(false);
      }
    };

    onBeforeMount(async () => {
      await episStore.fetchAllEpisodes(async () => {
        await charStore.fetchCharacter(Number(route.params.id), (newCharacter: ICharacter) => {
          character.value = newCharacter;
        });
      });
    });

    watch(
      () => charStore.data!.model,
      (newCharacter: ICharacter) => {
        character.value = newCharacter;
      }
    );

    onBeforeUnmount(() => {
      tmpCharacter = {};
      toggleEditMode(false);
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
      validInput,
      availableValidations,
      character,
      toggleEditMode,
      submitChanges,
      tmpKeepProp,
      goNext,
      goPrev,
      episodeTitle,
      isValid,
      totalCharacters
    };
  }
});
</script>
