<style scoped lang="scss">
@import '../../assets/scss/vars.scss';
.section {
  justify-content: space-between;
  display: inline-flex;
  width: 100%;
  &:not(.list-card) {
    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom: 2px dotted #ffffff5e;
    }
    span {
      font-size: 0.7em;
      display: inline-flex;
      align-items: center;
      letter-spacing: -0.001em;
      justify-content: space-between;
      i {
        margin-right: 0.5em;
        color: $project-secondary-color;
      }
    }
    @media (max-width: $xx-large) {
      flex-flow: column;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
    }
  }
  &.list-card {
    a {
      color: rgb(245, 245, 245);
      font-weight: normal;
      word-wrap: break-word;
      font-kerning: normal;
      -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    }
    border-bottom: none;
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;

    span {
      font-size: 1em;
      font-weight: 500;
    }

    a {
      color: rgb(245, 245, 245);
      &:hover,
      &:focus {
        color: rgb(255, 152, 0);
        text-decoration: none;
      }
    }
  }
  &.editing {
    background-color: #3b7171;
    padding: 0.5em 2em;
    margin: 1em auto;
  }
}
.editing {
  .section {
    &:not(.editing) {
      opacity: 0.3;
    }
  }
}
</style>
<template>
  <div class="section" v-if="!editable">
    <span :class="{ 'text-gray': !icon }"
      ><i v-if="icon" class="material-icons"> {{ icon }} </i>{{ label }}:
    </span>
    <b v-if="!url" :class="{ 'text-gray': content === 'unknown' }">{{ content || '-' }}</b>
    <b v-else-if="url">
      <template v-if="!editMode">
        <a :href="url" target="_blank">{{ content }}</a>
      </template>
      <template v-else>
        <a>{{ content }}</a>
      </template>
    </b>
  </div>
  <div class="section editing" v-else>
    <span
      ><i v-if="icon" class="material-icons"> {{ icon }} </i>{{ label }}:
    </span>
    <InputComponent
      :label="label"
      :type="'text'"
      :id="label"
      v-model:inputValue="editableContent"
      :use-submit="false"
      :validations="validations"
      v-on:update:inputValue="sectionEdited($event)"
      v-on:input-validation="isValid"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, type PropType } from 'vue';
import InputComponent from './InputComponent.vue';
import type { Validation } from '@vuelidate/core';
import { onUpdated } from 'vue';
import { computed } from 'vue';

export default defineComponent({
  name: 'SectionInfoComponent',
  components: {
    InputComponent
  },
  props: {
    label: String as PropType<string>,
    content: String as PropType<string | null>,
    url: String as PropType<string | null>,
    icon: String as PropType<string | null>,
    editable: Boolean as PropType<boolean>,
    validations: String as PropType<string>,
    editMode: Boolean as PropType<boolean>
  },
  emits: ['section:edit', 'input-validation'],
  setup(props, { emit }) {
    // const editableContent = ref(props.content);
    const state = reactive(props);

    const editableContent = ref(state.content); // computed(() => state.content); //

    const sectionEdited = (value: string) => {
      // editableContent.value = value;
      emit('section:edit', value);
    };

    const isValid = (arg: Validation) => {
      emit('input-validation', arg);
    };

    watch(editableContent, (updatedContent) => {
      console.log('item watched ', props.label, editableContent.value);
      // editableContent.value = updatedContent;
    });

    onUpdated(() => {
      console.log('item updated ', props.label, editableContent.value);
    });

    return {
      editableContent,
      sectionEdited,
      isValid
    };
  }
});
</script>
