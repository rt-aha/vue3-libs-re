import addMeta from '@/router/addMeta';

const children = [
  {
    path: 'input',
    name: 'input',
    component: () => import(/* webpackChunkName: "ReInput" */ '@/views/dataInput/ReInput.vue'),
    meta: {
      title: 'Input 輸入框',
    },
  },
  {
    path: 'input-number',
    name: 'input-number',
    component: () => import(/* webpackChunkName: "ReInputNumber" */ '@/views/dataInput/ReInputNumber.vue'),
    meta: {
      title: 'Input Number 數字輸入框',
    },
  },
  {
    path: 'input-list',
    name: 'input-list',
    component: () => import(/* webpackChunkName: "ReInputList" */ '@/views/dataInput/ReInputList.vue'),
    meta: {
      title: 'Input List 多輸入框',
    },
  },
  {
    path: 'auto-input',
    name: 'auto-input',
    component: () => import(/* webpackChunkName: "ReAutoInput" */ '@/views/dataInput/ReAutoInput.vue'),
    meta: {
      title: 'Auto Input 自動填入',
    },
  },
  {
    path: 'input-timer',
    name: 'input-timer',
    component: () => import(/* webpackChunkName: "ReInputTimer" */ '@/views/dataInput/ReInputTimer.vue'),
    meta: {
      title: 'Input Timer 倒數時器輸入框',
    },
  },
  {
    path: 'textarea',
    name: 'textarea',
    component: () => import(/* webpackChunkName: "ReTextarea" */ '@/views/dataInput/ReTextarea.vue'),
    meta: {
      title: 'Textarea 文本',
    },
  },
  {
    path: 'select',
    name: 'select',
    components: {
      default: () => import(/* webpackChunkName: "ReSelect" */ '@/views/dataInput/ReSelect.vue'),
      form: () => import(/* webpackChunkName: "ViewReForm" */ '@/views/dataInput/ReForm.vue'),
    },
    meta: {
      title: 'Select 選擇器',
    },
  },
  {
    path: 'radio',
    name: 'radio',
    component: () => import(/* webpackChunkName: "ReRadio" */ '@/views/dataInput/ReRadio.vue'),
    meta: {
      title: 'Radio 單選',
    },
  },
  {
    path: 'checkbox',
    name: 'checkbox',
    component: () => import(/* webpackChunkName: "ReCheckbox" */ '@/views/dataInput/ReCheckbox.vue'),
    meta: {
      title: 'Checkbox 單選框',
    },
  },
  {
    path: 'checkbox-group',
    name: 'checkbox-group',
    component: () => import(/* webpackChunkName: "ReCheckboxGroup" */ '@/views/dataInput/ReCheckboxGroup.vue'),
    meta: {
      title: 'Checkbox Group 多選框',
    },
  },
  {
    path: 'switch',
    name: 'switch',
    component: () => import(/* webpackChunkName: "ReSwitch" */ '@/views/dataInput/ReSwitch.vue'),
    meta: {
      title: 'Switch 開關',
    },
  },
  {
    path: 'time-picker',
    name: 'time-picker',
    component: () => import(/* webpackChunkName: "ReTimePicker" */ '@/views/dataInput/ReTimePicker.vue'),
    meta: {
      title: 'Time Picker 時間選擇器',
    },
  },
  {
    path: 'date-picker',
    name: 'date-picker',
    component: () => import(/* webpackChunkName: "ReDatePicker" */ '@/views/dataInput/ReDatePicker.vue'),
    meta: {
      title: 'Date Picker 日期選擇器',
    },
  },
  {
    path: 'date-range-picker',
    name: 'date-range-picker',
    component: () => import(/* webpackChunkName: "ReDateRangePicker" */ '@/views/dataInput/ReDateRangePicker.vue'),
    meta: {
      title: 'Date Range Picker 日期區間選擇器',
    },
  },
  {
    path: 'email-auto-complete',
    name: 'email-auto-complete',
    component: () => import(/* webpackChunkName: "ReEmailAutoComplete" */ '@/views/dataInput/ReEmailAutoComplete.vue'),
    meta: {
      title: 'Email Auto Complete Email自動補全',
    },
  },
  {
    path: 'upload',
    name: 'upload',
    component: () => import(/* webpackChunkName: "ReUpload" */ '@/views/dataInput/ReUpload.vue'),
    meta: {
      title: 'Upload 上傳',
    },
  },
];

const routes = [
  {
    path: '/data-input',
    name: 'data-input',
    component: () => import(/* webpackChunkName: "Baselayout" */ '@/layout/BaseLayout.vue'),
    children: addMeta(children, 'category', 'dataInput'),
  },
];

export default routes;
export { children };