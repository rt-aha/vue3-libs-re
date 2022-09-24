import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'avatar',
    name: 'avatar',
    component: () => import(/* webpackChunkName: "ReAvatar" */ '@/views/dataDisplay/ReAvatar.vue'),
    meta: {
      title: 'Avatar 大頭',
    },
  },
  {
    path: 'badge',
    name: 'badge',
    component: () => import(/* webpackChunkName: "ReBadge" */ '@/views/dataDisplay/ReBadge.vue'),
    meta: {
      title: 'Badge 標記',
    },
  },
  {
    path: 'empty',
    name: 'empty',
    component: () => import(/* webpackChunkName: "ReEmpty" */ '@/views/dataDisplay/ReEmpty.vue'),
    meta: {
      title: 'Empty 無資料',
    },
  },
  {
    path: 'image',
    name: 'image',
    component: () => import(/* webpackChunkName: "ReImage" */ '@/views/dataDisplay/ReImage.vue'),
    meta: {
      title: 'Image 圖片',
    },
  },
  {
    path: 'paragraph',
    name: 'paragraph',
    component: () => import(/* webpackChunkName: "Paragraph" */ '@/views/dataDisplay/ReParagraph.vue'),
    meta: {
      title: 'Paragraph 文章段落',
    },
  },

  {
    path: 'tag',
    name: 'tag',
    component: () => import(/* webpackChunkName: "ReTag" */ '@/views/dataDisplay/ReTag.vue'),
    meta: {
      title: 'Tag 標籤',
    },
  },
  {
    path: 'simple-table',
    name: 'simple-table',
    component: () => import(/* webpackChunkName: "ReSimpleTable" */ '@/views/dataDisplay/ReSimpleTable.vue'),
    meta: {
      title: 'SimpleTable 只讀表格',
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
