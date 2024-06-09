import { createRouter, createWebHistory } from 'vue-router';
import CharactersView from '../views/CharactersView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CharactersView
    },
    {
      path: '/character/:id',
      name: 'character',
      component: () => import('../views/CharacterDetailsView.vue')
    }
  ]
});

export default router;
