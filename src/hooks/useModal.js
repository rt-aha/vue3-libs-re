import { createApp, h, ref } from 'vue';
import ReModal from '@/components/feedback/ReModal.vue';

export default () => {
  const modal = ({ content = '', render, btns, data }) => {
    const getAppendDom = (target) => {
      const targetEle = document.getElementById(`${target}`);

      if (targetEle) {
        if (targetEle.hasChildNodes()) {
          const hasElementNode = Array(targetEle.childNodes).find((item) => {
            return item.nodeType === 1;
          });

          if (hasElementNode) {
            const ele = getAppendDom('inner-modal-target');
            return ele;
          }
        }
        else {
          return targetEle;
        }
      }

      const modalRoot = document.createElement('div');
      modalRoot.id = target;
      document.body.appendChild(modalRoot);

      return modalRoot;
    };

    return new Promise((resolve) => {
      const modalRoot = getAppendDom('modal-target');

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
              onClose: closeModal,
              visible,
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
