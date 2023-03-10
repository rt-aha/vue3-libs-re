import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueClickAway from 'vue3-click-away';
import VMdEditor from '@kangc/v-md-editor';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import Prism from 'prismjs';
import VueHighlightJS from 'vue3-highlightjs';
import App from './App.vue';
import router from './router';
import '@/styles/init/index.scss';
import '@/styles/utils/_rwd.scss';
import '@/styles/libs/atom-one-dark.scss';
import ContentLayout from '@/forDev/global/ContentLayout.vue';
import DevSection from '@/forDev/components/DevSection.vue';
import DevTitle from '@/forDev/components/DevTitle.vue';
import DevDesc from '@/forDev/components/DevDesc.vue';
import DevProps from '@/forDev/components/DevProps.vue';
import DevSlots from '@/forDev/components/DevSlots.vue';
import DevEvents from '@/forDev/components/DevEvents.vue';
import ReLoading from '@/components/feedback/ReLoading.vue';
import ReTree from '@/components/dataDisplay/ReTree.vue';
import ReTreeItem from '@/components/dataDisplay/ReTreeItem.vue';

import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// Prism
// highlight code
import 'prismjs/components/prism-json';

VMdEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App);
app.component('ContentLayout', ContentLayout);
app.component('DevSection', DevSection);
app.component('DevDesc', DevDesc);
app.component('DevProps', DevProps);
app.component('DevSlots', DevSlots);
app.component('DevEvents', DevEvents);
app.component('DevTitle', DevTitle);
app.component('ReLoading', ReLoading);
app.component('ReTree', ReTree);
app.component('ReTreeItem', ReTreeItem);

app.use(createPinia());
app.use(router);
app.use(VueHighlightJS);
app.use(VueClickAway);
app.use(VMdEditor);
app.mount('#app');
