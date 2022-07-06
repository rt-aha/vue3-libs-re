import { ref, createApp, h } from 'vue';

import AsyncDialog from '@/components/AsyncDialog/index.vue';


export default () => {
  const asyncDialog = ({ desc = '', callback, render, extraFunc }) => new Promise((resolve) => {
    const app = createApp({
      setup() {
        const visible = ref(true);
        const closeSubDialog = (status) => {
          visible.value = false;
          resolve(status);
        };
        return () => h(
          AsyncDialog,
          {
            visible: visible.value,
            'onUpdate:visible': closeSubDialog,
            callback,
          },
          h('div', {
            desc,
            render,
            extraFunc,
            close: closeSubDialog,
          }),
        );
      },
    });

    const root = document.createElement('div');
    document.body.appendChild(root);

    return {
      instance: app.mount(root),
      unmount() {
        app.unmount(root);
        document.body.removeChild(root);
      },
    };
  });

  return {
    asyncDialog,
  };
};
