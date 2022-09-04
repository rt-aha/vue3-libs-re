import { ref, createApp, h } from 'vue';

import AsyncDialog from '@/components/ReAsyncDialog.vue';

export default () => {
  const asyncDialog = ({ content = '', render, btns, renderType = 'normal' }) =>
    new Promise((resolve) => {
      const app = createApp({
        setup() {
          const visible = ref(true);
          const closeSubDialog = (status) => {
            visible.value = false;
            resolve(status);
          };
          return () =>
            h(AsyncDialog, {
              visible: visible.value,
              'onUpdate:visible': closeSubDialog,
              btns,
              renderType,
              render: h(
                renderType === 'render' ? render : 'div',
                {
                  close: closeSubDialog,
                },
                content,
              ),
            });
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
