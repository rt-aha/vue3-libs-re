import { createRouter, createWebHistory } from 'vue-router';
import common from '@/router/pages/common';
import dataDisplay from '@/router/pages/dataDisplay';
import navigation from '@/router/pages/navigation';
import dataInput from '@/router/pages/dataInput';
import feedback from '@/router/pages/feedback';
import testPage from '@/router/pages/testPage';

// console.log('routes..', pages);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
    },
    ...common,
    ...dataDisplay,
    ...navigation,
    ...dataInput,
    ...feedback,
    ...testPage,
    // ...widgets,
    // ...hooks,
    // ...compForm,
  ],
});

router.beforeEach((to, from, next) => {
  const scrollEle = document.querySelector('#app');
  if (scrollEle) {
    scrollEle.scrollTo({
      top: 0,
      left: 0,
    });
  }

  next();
});

export default router;
