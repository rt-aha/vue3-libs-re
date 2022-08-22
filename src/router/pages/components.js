import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'collapse-transition',
    name: 'collapse-transition',
    component: () => import(/* webpackChunkName: "CollapseTransition" */ '@/views/components/CollapseTransition.vue'),
  },
  {
    path: 'async-dialog',
    name: 'async-dialog',
    component: () => import(/* webpackChunkName: "AsyncDialog" */ '@/views/components/AsyncDialog.vue'),
  },
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
  },
  {
    path: 're-input',
    name: 're-input',
    component: () => import(/* webpackChunkName: "ReInput" */ '@/views/components/ReInput.vue'),
  },
  {
    path: 're-textarea',
    name: 're-textarea',
    component: () => import(/* webpackChunkName: "ReTextarea" */ '@/views/components/ReTextarea.vue'),
  },
  {
    path: 're-select',
    name: 're-select',
    component: () => import(/* webpackChunkName: "ReSelect" */ '@/views/components/ReSelect.vue'),
  },
  {
    path: 're-radio',
    name: 're-radio',
    component: () => import(/* webpackChunkName: "ReRadio" */ '@/views/components/ReRadio.vue'),
    meta: {
      title: 'Radio 單選框',
    },
  },
  {
    path: 're-checkbox',
    name: 're-checkbox',
    component: () => import(/* webpackChunkName: "ReCheckbox" */ '@/views/components/ReCheckbox.vue'),
    meta: {
      title: 'Checkbox 多選框',
    },
  },
  {
    path: 're-switch',
    name: 're-switch',
    component: () => import(/* webpackChunkName: "ReSwitch" */ '@/views/components/ReSwitch.vue'),
    meta: {
      title: 'Switch 開關',
    },
  },
  {
    path: 're-time-picker',
    name: 're-time-picker',
    component: () => import(/* webpackChunkName: "ReTimePicker" */ '@/views/components/ReTimePicker.vue'),
  },
  {
    path: 're-date-time-picker',
    name: 're-date-time-picker',
    component: () => import(/* webpackChunkName: "ReDateTimePicker" */ '@/views/components/ReDateTimePicker.vue'),
  },
  {
    path: 're-date-range-picker',
    name: 're-date-range-picker',
    component: () => import(/* webpackChunkName: "ReDateRangePicker" */ '@/views/components/ReDateRangePicker.vue'),
  },
  {
    path: 're-input-timer',
    name: 're-input-timer',
    component: () => import(/* webpackChunkName: "ReInputTimer" */ '@/views/components/ReInputTimer.vue'),
  },
  {
    path: 're-email-auto-complete',
    name: 're-email-auto-complete',
    component: () => import(/* webpackChunkName: "ReEmailAutoComplete" */ '@/views/components/ReEmailAutoComplete.vue'),
  },
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
    component: () => import(/* webpackChunkName: "ReTransfer" */ '@/views/components/ReTransfer.vue'),
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
