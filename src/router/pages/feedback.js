import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'drawer',
    name: 'drawer',
    component: () => import(/* webpackChunkName: "ReDrawer" */ '@/views/feedback/ReDrawer.vue'),
    meta: {
      title: 'ReDrawer 抽屜',
    },
  },
  {
    path: 'modal',
    name: 'modal',
    component: () => import(/* webpackChunkName: "ReModal" */ '@/views/feedback/ReModal.vue'),
    meta: {
      title: 'ReModal 彈窗',
    },
  },
  {
    path: 'skeleton',
    name: 'skeleton',
    component: () => import(/* webpackChunkName: "ReSkeleton" */ '@/views/feedback/ReSkeleton.vue'),
    meta: {
      title: 'Skeleton 骨架',
    },
  },
  {
    path: 'message',
    name: 'message',
    component: () => import(/* webpackChunkName: "ReMessage" */ '@/views/feedback/ReMessage.vue'),
    meta: {
      title: 'ReMessage 訊息',
    },
  },
];

const routes = [
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children: addMeta(children, 'category', 'feedback'),
  },
];

export default routes;
export { children };
