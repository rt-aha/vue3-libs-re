import { getCurrentInstance } from 'vue';

export default () => {
  let validFn = getCurrentInstance().parent.ctx.validateFields;

  // 看有沒有更好的做法 ?
  // if (getCurrentInstance().parent.ctx.$options.name === 'ReFormItem') {
  if (getCurrentInstance().parent?.ctx?.$options?.name === 'ReFormItem') {
    validFn = getCurrentInstance().parent.ctx.validateFields;
  }
  else {
    validFn = () => {};
  }

  return {
    validFn,
  };
};
