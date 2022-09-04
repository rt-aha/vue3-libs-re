import { ref, createApp, h } from 'vue';
import AsyncDialog from '@/components/ReAsyncDialog.vue';

export default () => {
  const asyncDialog = ({ content = '', render, btns, renderType = 'normal', desc }) => {
    const getAppendDom = (target) => {
      let targetEle = document.querySelector(`.${target}`);
      if (targetEle) {
        return targetEle;
      }

      const dialogRoot = document.createElement('div');
      dialogRoot.className = 'dialog-wrap';
      document.body.appendChild(dialogRoot);

      return dialogRoot;
    };

    return new Promise((resolve) => {
      const dialogRoot = getAppendDom('dialog-wrap');

      const app = createApp({
        setup() {
          const visible = ref(true);
          const closeSubDialog = () => {
            visible.value = false;
            resolve('dialogRemoved');
            app.unmount();
          };
          return () =>
            h(AsyncDialog, {
              visible: visible.value,
              'onUpdate:visible': closeSubDialog,
              btns,
              renderType,
              desc,
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

      app.mount(dialogRoot);
    });
  };

  return {
    asyncDialog,
  };
};
