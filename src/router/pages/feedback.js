import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'steps',
    name: 'steps',
    component: () => import(/* webpackChunkName: "ReSteps" */ '@/views/feedback/ReSteps.vue'),
    meta: {
      title: 'ReSteps 步驟',
      manualTesting: true,
    },
  },
  {
    path: 'countdown',
    name: 'countdown',
    component: () => import(/* webpackChunkName: "ReCountdown" */ '@/views/feedback/ReCountdown.vue'),
    meta: {
      title: 'ReCountdown 倒數',
      manualTesting: true,
    },
  },
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
      manualTesting: true,
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
  {
    path: 'tooltip',
    name: 'tooltip',
    component: () => import(/* webpackChunkName: "ReTooltip" */ '@/views/feedback/ReTooltip.vue'),
    meta: {
      title: 'ReTooltip 彈出訊息',
      manualTesting: true,
    },
  },
  {
    path: 'loading',
    name: 'loading',
    component: () => import(/* webpackChunkName: "ReLoading" */ '@/views/feedback/Loading.vue'),
    meta: {
      title: 'Loading 載入小動畫',
      manualTesting: true,
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
