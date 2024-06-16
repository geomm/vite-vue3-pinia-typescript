<style scoped lang="scss">
.loader {
  display: inline-grid;
  padding: 5px;
  background: transparent;
  filter: contrast(12);
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -65px;
  margin-top: -25px;
  z-index: 2;
  &:before {
    content: '';
    height: 40px;
    aspect-ratio: 3;
    --c: #ffb30000 64%, #f0ff00 66% 98%, #0000 101%;
    background:
      radial-gradient(35% 146% at 50% 159%, var(--c)) 0 0,
      radial-gradient(35% 146% at 50% -59%, var(--c)) 100% 100%;
    background-size: calc(200% / 3) 50%;
    background-repeat: repeat-x;
    animation: l11 0.8s infinite linear;
  }
}
@keyframes l11 {
  to {
    background-position:
      -200% 0,
      -100% 100%;
  }
}
</style>
<template>
  <div class="loader"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoaderComponent'
});
</script>
