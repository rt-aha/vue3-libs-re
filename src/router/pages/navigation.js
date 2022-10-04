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
  {
    path: 'tabs',
    name: 'tabs',
    component: () => import(/* webpackChunkName: "ReTabs" */ '@/views/navigation/ReTabs.vue'),
    meta: {
      title: 'ReTabs 標籤頁',
    },
  },
  {
    path: 'breadcrumb',
    name: 'breadcrumb',
    component: () => import(/* webpackChunkName: "ReBreadcrumb" */ '@/views/navigation/ReBreadcrumb.vue'),
    meta: {
      title: 'ReBreadcrumb 麵包屑',
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
