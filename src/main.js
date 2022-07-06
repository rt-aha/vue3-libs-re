import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@/styles/init/index.scss';
import '@/styles/utils/_rwd.scss';
import VueHighlightJS from 'vue3-highlightjs';
import ContentLayout from '@/components/Global/ContentLayout.vue';

const app = createApp(App);
app.component('ContentLayout', ContentLayout);
app.use(createPinia()).use(router).use(VueHighlightJS).mount('#app');
