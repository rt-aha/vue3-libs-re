import { createRouter, createWebHistory } from 'vue-router';
import pages from '~pages';

// console.log('routes..', pages);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: '',
      component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
      meta: {
        title: 'layout',
        siteMap: {
          title: 'layout',
          show: false,
        },
      },
      children: pages,
    },
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
