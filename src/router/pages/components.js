import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'collapse-transition',
    name: 'collapse-transition',
    component: () => import(/* webpackChunkName: "CollapseTransition" */ '@/views/components/CollapseTransition.vue'),
  },
  {
    path: 'dialog',
    name: 'dialog',
    component: () => import(/* webpackChunkName: "Dialog" */ '@/views/components/Dialog.vue'),
  },
];

const routes = [
  {
    path: '/components',
    name: 'components',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children: addMeta(children, 'category', 'components'),
  },
];

export default routes;
export { children };
