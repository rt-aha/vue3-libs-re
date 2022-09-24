import addMeta from '@/router/addMeta';

const children = [
  {
    path: 're-pagination',
    name: 're-pagination',
    component: () => import(/* webpackChunkName: "RePagination" */ '@/views/components/RePagination.vue'),
    meta: {
      title: 'RePagination 頁數',
    },
  },
  {
    path: 're-drawer',
    name: 're-drawer',
    component: () => import(/* webpackChunkName: "ReDrawer" */ '@/views/components/ReDrawer.vue'),
    meta: {
      title: 'ReDrawer 抽屜',
    },
  },
  {
    path: 're-modal',
    name: 're-modal',
    component: () => import(/* webpackChunkName: "ReModal" */ '@/views/components/ReModal.vue'),
    meta: {
      title: 'ReModal 彈窗',
    },
  },
  {
    path: 're-skeleton',
    name: 're-skeleton',
    component: () => import(/* webpackChunkName: "ReSkeleton" */ '@/views/components/ReSkeleton.vue'),
    meta: {
      title: 'ReSkeleton 骨架',
    },
  },
  {
    path: 're-image',
    name: 're-image',
    component: () => import(/* webpackChunkName: "ReImage" */ '@/views/components/ReImage.vue'),
    meta: {
      title: 'Image 圖片',
    },
  },
  {
    path: 're-empty',
    name: 're-empty',
    component: () => import(/* webpackChunkName: "ReEmpty" */ '@/views/components/ReEmpty.vue'),
    meta: {
      title: 'Empty 無資料',
    },
  },
  {
    path: 're-dropdown',
    name: 're-dropdown',
    component: () => import(/* webpackChunkName: "ReDropdown" */ '@/views/compForm/ReDropdown.vue'),
    meta: {
      title: 'Dropdown 下拉選單',
    },
  },

  {
    path: 'collapse-transition',
    name: 'collapse-transition',
    component: () => import(/* webpackChunkName: "CollapseTransition" */ '@/views/components/CollapseTransition.vue'),
  },
  // {
  //   path: 'async-dialog',
  //   name: 'async-dialog',
  //   component: () => import(/* webpackChunkName: "AsyncDialog" */ '@/views/components/AsyncDialog.vue'),
  // },
  {
    path: 'paragraph',
    name: 'paragraph',
    component: () => import(/* webpackChunkName: "Paragraph" */ '@/views/components/ReParagraph.vue'),
  },
  {
    path: 'simple-table',
    name: 'simple-table',
    component: () => import(/* webpackChunkName: "SimpleTable" */ '@/views/components/ReSimpleTable.vue'),
  },
  {
    path: 're-button',
    name: 're-button',
    component: () => import(/* webpackChunkName: "ReButton" */ '@/views/components/ReButton.vue'),
    meta: {
      title: 'Button 按鈕',
    },
  },
  // {
  //   path: 're-input',
  //   name: 're-input',
  //   component: () => import(/* webpackChunkName: "ReInput" */ '@/views/compForm/ReInput.vue'),
  // },

  {
    path: 're-message',
    name: 're-message',
    component: () => import(/* webpackChunkName: "ReMessage" */ '@/views/components/ReMessage.vue'),
  },
  {
    path: 're-badge',
    name: 're-badge',
    component: () => import(/* webpackChunkName: "ReBadge" */ '@/views/components/ReBadge.vue'),
    meta: {
      title: 'Badge 標記',
    },
  },
  {
    path: 're-avatar',
    name: 're-avatar',
    component: () => import(/* webpackChunkName: "ReAvatar" */ '@/views/components/ReAvatar.vue'),
    meta: {
      title: 'Avatar 大頭',
    },
  },
  {
    path: 're-divider',
    name: 're-divider',
    component: () => import(/* webpackChunkName: "ReDivider" */ '@/views/components/ReDivider.vue'),
    meta: {
      title: 'Divider 分隔線',
    },
  },
  {
    path: 're-tag',
    name: 're-tag',
    component: () => import(/* webpackChunkName: "ReTag" */ '@/views/components/ReTag.vue'),
    meta: {
      title: 'Tag 標籤',
    },
  },
  {
    path: 're-transfer',
    name: 're-transfer',
    component: () => import(/* webpackChunkName: "ReTransfer" */ '@/views/compForm/ReTransfer.vue'),
    meta: {
      title: 'Transfer 穿梭框',
    },
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
