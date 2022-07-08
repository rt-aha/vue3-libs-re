import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'use-request',
    name: 'use-request',
    component: () => import(/* webpackChunkName: "UseRequest" */ '@/views/hooks/UseRequest.vue'),
  },
  {
    path: 'use-async-dialog',
    name: 'use-async-dialog',
    component: () => import(/* webpackChunkName: "UseAsyncDialog" */ '@/views/hooks/UseAsyncDialog.vue'),
  },
];
const routes = [
  {
    path: '/hooks',
    name: 'hooks',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children: addMeta(children, 'category', 'hooks'),
  },
];

export default routes;
export { children };
