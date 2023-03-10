import addMeta from '@/router/addMeta';

const children = [
  {
    path: 're-form',
    name: 're-form',
    component: () => import(/* webpackChunkName: "ReForm" */ '@/views/widgets/ReForm.vue'),
    meta: {
      title: 'Form 表單',
    },
    props: {
      form: {
        title: 'Form 表單',
      },
    },
  },
  {
    path: 're-search',
    name: 're-search',
    component: () => import(/* webpackChunkName: "ReSearch" */ '@/views/widgets/ReSearch.vue'),
    meta: {
      title: 'Search 搜尋',
    },
  },
  {
    path: 'manage-page',
    name: 'manage-page',
    component: () => import(/* webpackChunkName: "ManagePage" */ '@/views/widgets/ManagePage.vue'),
  },
];

const routes = [
  {
    path: '/widgets',
    name: 'widgets',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children: addMeta(children, 'category', 'widgets'),
  },
];

export default routes;
export { children };
