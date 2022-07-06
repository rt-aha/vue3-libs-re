import { createRouter, createWebHistory } from 'vue-router';
import components from '@/router/pages/components';
import hooks from '@/router/pages/hooks';
import widgets from '@/router/pages/widgets';

// console.log('routes..', pages);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
    },

    ...components,
    ...widgets,
    ...hooks,
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
