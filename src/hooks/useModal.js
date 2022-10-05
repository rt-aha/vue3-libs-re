import { createApp, h, ref } from 'vue';
import ReModal from '@/components/feedback/ReModal.vue';

export default () => {
  const modal = ({ content = '', render, btns, data }) => {
    const getAppendDom = (target) => {
      const targetEle = document.querySelector(`.${target}`);

      if (targetEle) {
        if (targetEle.hasChildNodes()) {
          const ele = getAppendDom('modal-inner-wrap');
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
      const modalRoot = getAppendDom('modal-wrap');

      const app = createApp({
        setup() {
          const visible = ref(true);
          const closeModal = (fulfillContent = true) => {
            visible.value = false;
            resolve(fulfillContent);
            app.unmount();
          };
          return () =>
            h(ReModal, {
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
    modal,
  };
};
