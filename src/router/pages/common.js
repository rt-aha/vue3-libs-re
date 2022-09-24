import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'button',
    name: 'button',
    component: () => import(/* webpackChunkName: "ReButton" */ '@/views/common/ReButton.vue'),
    meta: {
      title: 'Button 按鈕',
    },
  },
  {
    path: 'divider',
    name: 'divider',
    component: () => import(/* webpackChunkName: "ReDivider" */ '@/views/common/ReDivider.vue'),
    meta: {
      title: 'Divider 分隔線',
    },
  },
  {
    path: 'dropdown',
    name: 'dropdown',
    component: () => import(/* webpackChunkName: "ReDropdown" */ '@/views/common/ReDropdown.vue'),
    meta: {
      title: 'Dropdown 下拉選單',
    },
  },
];

const routes = [
  {
    path: '/common',
    name: 'common',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children: addMeta(children, 'category', 'common'),
  },
];

export default routes;
export { children };
