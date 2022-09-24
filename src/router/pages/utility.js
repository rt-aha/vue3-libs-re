import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'collapse-transition',
    name: 'collapse-transition',
    component: () => import(/* webpackChunkName: "CollapseTransition" */ '@/views/utility/CollapseTransition.vue'),
    meta: {
      title: '下拉顯示框',
    },
  },
];

const routes = [
  {
    path: '/utility',
    name: 'utility',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children: addMeta(children, 'category', 'utility'),
  },
];

export default routes;
export { children };
