import addMeta from '@/router/addMeta';

const children = [
  {
    path: 're-form',
    name: 're-form',
    component: () => import(/* webpackChunkName: "ReForm" */ '@/views/widgets/ReForm.vue'),
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
