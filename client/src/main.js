import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VCalendar from 'v-calendar';
import vSelect from 'vue-select';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());

app.use(VCalendar, {});

app.component('v-select', vSelect);

app.mount('#app');
