<style scoped lang="scss">
@import '../../assets/scss/vars.scss';
.section {
  justify-content: space-between;
  display: inline-flex;
  width: 100%;
  &:hover {
    border-bottom: 2px dotted #ffffff5e;
  }
  &:not(.list-card) {
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
}
</style>
<template>
  <div class="section" v-if="content">
    <span :class="{ 'text-gray': !icon }"
      ><i v-if="icon" class="material-icons"> {{ icon }} </i>{{ label }}:
    </span>
    <b v-if="!url" :class="{ 'text-gray': content === 'unknown' }">{{ content || '' }}</b>
    <b v-else-if="url"
      ><a :href="url" target="_blank">{{ content }}</a></b
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
export default defineComponent({
  name: 'SectionInfoComponent',
  props: {
    label: String as PropType<string | null>,
    content: String as PropType<string | null>,
    url: String as PropType<string | null>,
    icon: String as PropType<string | null>
  }
});
</script>
