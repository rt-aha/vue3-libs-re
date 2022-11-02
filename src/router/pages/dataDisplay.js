import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'time-line',
    name: 'time-line',
    component: () => import(/* webpackChunkName: "ReTimeline" */ '@/views/dataDisplay/ReTimeline.vue'),
    meta: {
      title: 'Timeline 時間軸',
      manualTesting: true,
    },
  },
  {
    path: 'swiper',
    name: 'swiper',
    component: () => import(/* webpackChunkName: "ReSwiper" */ '@/views/dataDisplay/ReSwiper.vue'),
    meta: {
      title: 'Swiper 輪播',
      manualTesting: true,
    },
  },
  {
    path: 'countTo',
    name: 'countTo',
    component: () => import(/* webpackChunkName: "ReCountTo" */ '@/views/dataDisplay/ReCountTo.vue'),
    meta: {
      title: 'CountTo 數字動畫',
      manualTesting: true,
    },
  },
  {
    path: 'tree',
    name: 'tree',
    component: () => import(/* webpackChunkName: "ReTree" */ '@/views/dataDisplay/ReTree.vue'),
    meta: {
      title: 'Tree 樹形控件',
    },
  },
  {
    path: 'avatar',
    name: 'avatar',
    component: () => import(/* webpackChunkName: "ReAvatar" */ '@/views/dataDisplay/ReAvatar.vue'),
    meta: {
      title: 'Avatar 大頭照',
      manualTesting: true,
    },
  },
  {
    path: 'badge',
    name: 'badge',
    component: () => import(/* webpackChunkName: "ReBadge" */ '@/views/dataDisplay/ReBadge.vue'),
    meta: {
      title: 'Badge 標記',
      manualTesting: true,
    },
  },
  {
    path: 'empty',
    name: 'empty',
    component: () => import(/* webpackChunkName: "ReEmpty" */ '@/views/dataDisplay/ReEmpty.vue'),
    meta: {
      title: 'Empty 無資料',
      manualTesting: true,
    },
  },
  {
    path: 'image',
    name: 'image',
    component: () => import(/* webpackChunkName: "ReImage" */ '@/views/dataDisplay/ReImage.vue'),
    meta: {
      title: 'Image 圖片',
      manualTesting: true,
    },
  },
  {
    path: 'paragraph',
    name: 'paragraph',
    component: () => import(/* webpackChunkName: "Paragraph" */ '@/views/dataDisplay/ReParagraph.vue'),
    meta: {
      title: 'Paragraph 敘述段落',
      manualTesting: true,
    },
  },
  {
    path: 'accordion',
    name: 'accordion',
    component: () => import(/* webpackChunkName: "ReList" */ '@/views/dataDisplay/ReAccordion.vue'),
    meta: {
      title: 'ReAccordion 手風琴',
      manualTesting: true,
    },
  },
  {
    path: 'tag',
    name: 'tag',
    component: () => import(/* webpackChunkName: "ReTag" */ '@/views/dataDisplay/ReTag.vue'),
    meta: {
      title: 'Tag 標籤',
      manualTesting: true,
    },
  },
  {
    path: 'simple-table',
    name: 'simple-table',
    component: () => import(/* webpackChunkName: "ReSimpleTable" */ '@/views/dataDisplay/ReSimpleTable.vue'),
    meta: {
      title: 'SimpleTable 只讀表格',
      manualTesting: true,
    },
  },
  {
    path: 'table',
    name: 'table',
    component: () => import(/* webpackChunkName: "ReTable" */ '@/views/dataDisplay/Table.vue'),
    meta: {
      title: 'Table 表格',
    },
  },
  {
    path: 'list',
    name: 'list',
    component: () => import(/* webpackChunkName: "ReList" */ '@/views/dataDisplay/List.vue'),
    meta: {
      title: 'List 列表',
      manualTesting: true,
    },
  },
];

const routes = [
  {
    path: '/data-display',
    name: 'data-display',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children: addMeta(children, 'category', 'data-display'),
  },
];

export default routes;
export { children };
