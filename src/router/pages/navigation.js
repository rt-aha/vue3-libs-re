import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'pagination',
    name: 'pagination',
    component: () => import(/* webpackChunkName: "RePagination" */ '@/views/navigation/Pagination.vue'),
    meta: {
      title: 'RePagination 頁數',
    },
  },
];

const routes = [
  {
    path: '/navigation',
    name: 'navigation',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children: addMeta(children, 'category', 'navigation'),
  },
];

export default routes;
export { children };
