import addMeta from '@/router/addMeta';

const children = [
  {
    path: 're-input',
    name: 're-input',
    component: () => import(/* webpackChunkName: "ReInput" */ '@/views/compForm/ReInput.vue'),
    meta: {
      title: 'Input 輸入框',
    },
  },
  {
    path: 're-input-number',
    name: 're-input-number',
    component: () => import(/* webpackChunkName: "ReInputNumber" */ '@/views/compForm/ReInputNumber.vue'),
    meta: {
      title: 'Input Number 數字輸入框',
    },
  },
  {
    path: 're-textarea',
    name: 're-textarea',
    component: () => import(/* webpackChunkName: "ReTextarea" */ '@/views/compForm/ReTextarea.vue'),
    meta: {
      title: 'Textarea 文本',
    },
  },
  {
    path: 're-select',
    name: 're-select',
    components: {
      default: () => import(/* webpackChunkName: "ReSelect" */ '@/views/compForm/ReSelect.vue'),
      form: () => import(/* webpackChunkName: "ViewReForm" */ '@/views/widgets/ReForm.vue'),
    },
    meta: {
      title: 'Select 選擇器',
    },
  },
  {
    path: 're-radio',
    name: 're-radio',
    component: () => import(/* webpackChunkName: "ReRadio" */ '@/views/components/ReRadio.vue'),
    meta: {
      title: 'Radio 單選',
    },
  },
  {
    path: 're-checkbox',
    name: 're-checkbox',
    component: () => import(/* webpackChunkName: "ReCheckbox" */ '@/views/compForm/ReCheckbox.vue'),
    meta: {
      title: 'Checkbox 單選框',
    },
  },
  {
    path: 're-checkbox-group',
    name: 're-checkbox-group',
    component: () => import(/* webpackChunkName: "ReCheckboxGroup" */ '@/views/compForm/ReCheckboxGroup.vue'),
    meta: {
      title: 'CheckboxGroup 多選框',
    },
  },
  {
    path: 're-switch',
    name: 're-switch',
    component: () => import(/* webpackChunkName: "ReSwitch" */ '@/views/compForm/ReSwitch.vue'),
    meta: {
      title: 'Switch 開關',
    },
  },
  {
    path: 're-time-picker',
    name: 're-time-picker',
    component: () => import(/* webpackChunkName: "ReTimePicker" */ '@/views/compForm/ReTimePicker.vue'),
  },
  {
    path: 're-date-time-picker',
    name: 're-date-time-picker',
    component: () => import(/* webpackChunkName: "ReDateTimePicker" */ '@/views/compForm/ReDateTimePicker.vue'),
  },
  {
    path: 're-date-range-picker',
    name: 're-date-range-picker',
    component: () => import(/* webpackChunkName: "ReDateRangePicker" */ '@/views/compForm/ReDateRangePicker.vue'),
  },
  {
    path: 're-email-auto-complete',
    name: 're-email-auto-complete',
    component: () => import(/* webpackChunkName: "ReEmailAutoComplete" */ '@/views/compForm/ReEmailAutoComplete.vue'),
  },
  {
    path: 're-input-timer',
    name: 're-input-timer',
    component: () => import(/* webpackChunkName: "ReInputTimer" */ '@/views/compForm/ReInputTimer.vue'),
  },
];

const routes = [
  {
    path: '/comp-form',
    name: 'comp-form',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children: addMeta(children, 'category', 'compForm'),
  },
];

export default routes;
export { children };