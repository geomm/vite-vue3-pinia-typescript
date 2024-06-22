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
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top
    console.log(to, from, savedPosition);
    return { top: 0 };
  }
});

export default router;
