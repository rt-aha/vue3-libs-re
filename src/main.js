import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@/styles/init/index.scss';
import '@/styles/utils/_rwd.scss';
import VueHighlightJS from 'vue3-highlightjs';
import '@/styles/libs/atom-one-dark.scss';
import ContentLayout from '@/components/Global/ContentLayout.vue';
import DevSection from '@/devComponents/DevSection.vue';
import DevTitle from '@/devComponents/DevTitle.vue';

import VueClickAway from 'vue3-click-away';

const app = createApp(App);
app.component('ContentLayout', ContentLayout);
app.component('DevSection', DevSection);
app.component('DevTitle', DevTitle);

app.use(createPinia()).use(router).use(VueHighlightJS).use(VueClickAway).mount('#app');
