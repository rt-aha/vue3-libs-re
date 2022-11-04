import { createApp, h, ref } from 'vue';
import ReDrawer from '@/components/feedback/ReDrawer.vue';

export default () => {
  const drawer = ({ content = '', render, btns, data, width }) => {
    const getAppendDom = (target) => {
      const targetEle = document.querySelector(`#${target}`);

      if (targetEle) {
        if (targetEle.hasChildNodes()) {
          const hasElementNode = Array(targetEle.childNodes).find((item) => {
            return item.nodeType === 1;
          });

          if (hasElementNode) {
            // console.log('hasElementNode...', hasElementNode);

            const ele = getAppendDom('inner-drawer-target');
            return ele;
          }
        }
        else {
          return targetEle;
        }
      }

      const drawerRoot = document.createElement('div');
      drawerRoot.id = target;
      document.body.appendChild(drawerRoot);

      return drawerRoot;
    };

    return new Promise((resolve) => {
      const drawerRoot = getAppendDom('drawer-target');

      const app = createApp({
        setup() {
          const visible = ref(true);
          const closeDrawer = (fulfillContent = true) => {
            visible.value = false;
            resolve(fulfillContent);
            app.unmount();
          };
          return () =>
            h(ReDrawer, {
              onClose: closeDrawer,
              data,
              visible,
              btns,
              content,
              width,
              render: render
                ? h(render, {
                  close: closeDrawer,
                  data,
                })
                : null,
            });
        },
      });

      app.mount(drawerRoot);
    });
  };

  return {
    drawer,
  };
};
