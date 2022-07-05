const children = [
  {
    path: 'use-request',
    name: 'use-request',
    component: () => import(/* webpackChunkName: "UseRequest" */ '@/views/hooks/CollapseTransition.vue'),
  },
];

const routes = [
  {
    path: '/hooks',
    name: 'hooks',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children,
  },
];

export default routes;
export { children };
