<style scoped lang="scss">
.card {
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
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;

      h2 {
        font-size: 1.5rem;
        font-weight: 800;
      }

      &:first-child {
        -webkit-box-pack: start;
        justify-content: flex-start;
      }
      &:last-child {
        -webkit-box-pack: end;
        justify-content: flex-end;
      }
      span {
        font-size: 16px;
        font-weight: 500;
      }
      .text-gray {
        color: rgb(158, 158, 158);
      }
      .status {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        text-transform: capitalize;
        .status__icon {
          height: 0.5rem;
          width: 0.5rem;
          margin-right: 0.375rem;
          background: rgb(158, 158, 158);
          border-radius: 50%;
        }
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
}
</style>
<template>
  <li class="card" v-if="character as ICharacter" :key="character.id">
    <div class="image">
      <img :src="character.image" :alt="character.name" />
    </div>
    <div class="info">
      <div class="section">
        <a href="javascript:void(0)" @click="redirect(character?.id)"
          ><h2>{{ character?.name || '' }}</h2></a
        >
        <!-- <RouterLink :to="{ name: 'character', params: { id: character?.id } }"
          ><h2>{{ character?.name || '' }}</h2></RouterLink
        > -->
        <span class="status">
          <span class="status_icon"></span>
          {{ character?.status || '' }} - {{ character?.species || '' }}
        </span>
      </div>
      <div class="section">
        <span class="text-gray">Last known location: </span>
        <a :href="character.location?.url" target="_blank">{{ character.location?.name || '' }}</a>
      </div>
      <div class="section">
        <span class="text-gray">First seen in:</span>
        <a :href="character.episode?.[character.episode?.length - 1]" target="_blank">{{
          character.episode?.[character.episode?.length - 1]
        }}</a>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ICharacter } from '@/models/character.model';
import router from '@/router';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListCardComponent',
  props: ['character'],
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
