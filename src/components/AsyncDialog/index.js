import ReAsyncDialog from './src/AsyncDialog.vue';

/* istanbul ignore next */
ReAsyncDialog.install = (Vue) => {
  Vue.component(ReAsyncDialog.name, ReAsyncDialog);
};

export default ReAsyncDialog;
