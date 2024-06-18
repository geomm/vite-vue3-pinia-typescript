import './assets/scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Example plugin that logs state changes
pinia.use(({ store }) => {
  store.$subscribe((mutation, state) => {
    console.log(mutation.type);
    console.log(mutation.storeId);
    console.log(state);
  });
});

app.mount('#app');
