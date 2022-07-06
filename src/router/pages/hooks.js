import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'use-request',
    name: 'use-request',
    component: () => import(/* webpackChunkName: "UseRequest" */ '@/views/hooks/UseRequest.vue'),
  },
];

const routes = [
  {
    path: '/hooks',
    name: 'hooks',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children: addMeta(children, 'category', 'hook'),
  },
];

export default routes;
export { children };
