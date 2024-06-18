<style scoped lang="scss">
@import './assets/scss/vars.scss';

header {
  line-height: 1.5;
  max-height: 100vh;
  position: relative;
  @media (min-width: $larger) {
    display: flex;
    place-items: center;
    position: fixed;
    top: 0px;
    z-index: 1;
    left: 0px;
  }
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  @media (min-width: $larger) {
    margin: 0 2rem 0 2rem;
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    &.router-link-exact-active {
      color: var(--color-text);
    }

    &.router-link-exact-active:hover {
      background-color: transparent;
    }

    &:first-of-type {
      border: 0;
    }
  }
  @media (min-width: $larger) {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
<template>
  <header>
    <RouterLink class="logo" to="/"
      ><img
        alt="Vue logo"
        class="logo"
        src="@/assets/rick-and-morty-logo.svg"
        width="300"
        height="150"
    /></RouterLink>
  </header>
  <RouterView :key="$route.fullPath"/>
  <LoaderComponent v-if="charStore.$state.loading" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import LoaderComponent from './components/UICompoents/LoaderComponent.vue';
import { characterStore } from './stores/character.store';

export default defineComponent({
  name: 'AppComponent',
  components: {
    RouterLink,
    RouterView,
    LoaderComponent
  },
  setup() {
    const charStore = characterStore();
    return {
      charStore
    };
  }
});
</script>
