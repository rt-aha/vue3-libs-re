import { createApp, h, ref } from 'vue';
import ReMessage from '@/components/feedback/ReMessage.vue';

export default () => {
  const message = ({ content = '', render, btns, data }) => {
    const getAppendDom = (target) => {
      const targetEle = document.querySelector(`.${target}`);

      if (targetEle) {
        if (targetEle.hasChildNodes()) {
          const ele = getAppendDom('message-inner-wrap');
          return ele;
        }
        else {
          return targetEle;
        }
      }

      const modalRoot = document.createElement('div');
      modalRoot.className = target;
      document.body.appendChild(modalRoot);

      return modalRoot;
    };

    return new Promise((resolve) => {
      const modalRoot = getAppendDom('message-wrap');

      const app = createApp({
        setup() {
          const visible = ref(true);
          const closeModal = (fulfillContent = true) => {
            visible.value = false;
            resolve(fulfillContent);
            app.unmount();
            console.log('?!?!');
          };
          return () =>
            h(ReMessage, {
              onCloseModal: closeModal,
              data,
              btns,
              content,
              render: render
                ? h(render, {
                  close: closeModal,
                  data,
                })
                : null,
            });
        },
      });

      app.mount(modalRoot);
    });
  };

  return {
    message,
  };
};
