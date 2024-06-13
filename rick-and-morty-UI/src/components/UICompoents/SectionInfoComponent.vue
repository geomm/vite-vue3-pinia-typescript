<style scoped lang="scss">
.section {
  justify-content: space-between;
  display: inline-flex;
  width: 100%;
  border-bottom: 2px dotted #ffffff5e;
}
</style>
<template>
  <div class="section" v-if="content">
    <span class="text-gray">{{ label }}: </span>
    <b v-if="!url">{{ content || '' }}</b>
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
    url: String as PropType<string | null>
  }
});
</script>
