<style scoped lang="scss">
.rick-and-morty-api-card {
  width: 600px;
  height: 220px;
  display: flex;
  overflow: hidden;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 0.75rem;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  .image {
    flex: 2 1 0%;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      margin: 0px;
      opacity: 1;
      transition: opacity 0.5s ease 0s;
      object-position: center center;
      object-fit: cover;
    }
  }
  .info {
    flex: 3 1 0%;
    position: relative;
    padding: 0.75rem;
    color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    .section {
      a {
        color: rgb(245, 245, 245);
        &:hover {
          color: rgb(255, 152, 0);
          text-decoration: none;
        }
      }
    }
  }
}
</style>
<template>
  <li class="rick-and-morty-api-card" v-if="character" :key="character.id">
    <div class="image">
      <img :src="character.image" :alt="character.name" />
    </div>
    <div class="info">
      <div class="section">
        <a @click="redirect(character?.id)"
          ><h2>{{ character?.name }}</h2></a
        >
        <StatusComponent :status="character?.status" :species="character?.species" />
      </div>
      <SectionInfoComponent
        class="list-card"
        :label="'Last known location'"
        :content="character.location?.name"
        :url="character.location?.url"
      />
      <SectionInfoComponent
        class="list-card"
        :label="'First seen in'"
        :content="character.episode?.[character.episode?.length - 1]"
        :url="character.episode?.[character.episode?.length - 1]"
      />
    </div>
  </li>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
import SectionInfoComponent from '../UICompoents/SectionInfoComponent.vue';
import StatusComponent from '../UICompoents/StatusComponent.vue';

export default defineComponent({
  name: 'ListCardComponent',
  props: ['character'],
  components: {
    SectionInfoComponent,
    StatusComponent
  },
  setup() {
    const redirect = (id: number) => {
      router.push({ name: `character`, params: { id: id } });
    };
    return {
      redirect
    };
  }
});
</script>
