const children = [
  {
    path: 'manage-page',
    name: 'manage-page',
    component: () => import(/* webpackChunkName: "ManagePage" */ '@/views/components/ManagePage.js'),
  },
];

const routes = [
  {
    path: '/components',
    name: 'components',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children,
  },
];

export default routes;
export { children };
