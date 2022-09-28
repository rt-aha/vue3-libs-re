import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'request',
    name: 'test-request',
    component: () => import(/* webpackChunkName: "Request" */ '@/views/testPage/Request.vue'),
    meta: {
      title: 'Test Request 請求測試',
    },
  },
];

const routes = [
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children: addMeta(children, 'category', 'test'),
  },
];

export default routes;
export { children };
