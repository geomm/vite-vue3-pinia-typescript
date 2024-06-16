<style scoped lang="scss">
.status {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  text-transform: capitalize;
  .status_icon {
    height: 0.5rem;
    width: 0.5rem;
    margin-right: 0.375rem;
    background: rgb(158, 158, 158);
    border-radius: 50%;

    &.alive {
      background: var(--vt-ui-project-status-icon-green);
    }
    &.dead {
      background: var(--vt-ui-project-status-icon-red);
    }
  }
}
</style>
<template>
  <span class="status">
    <span class="status_icon" :class="(status || '').toLowerCase()"></span>
    {{ status }} -
    {{ species }}
  </span>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'StatusComponent',
  props: {
    status: String as PropType<string | null>,
    species: String as PropType<string | null>
  }
});
</script>
