<template>
  <div class="v-drawer">
    <dev-section title="基本使用">
      <ReButton @click="openDrawer">Open Drawer</ReButton>
    </dev-section>
    <dev-section title="使用預設按鈕">
      <ReButton @click="openDrawerWithDefaultBtns">Open Modal With Default Button</ReButton>
    </dev-section>
    <dev-section title="使用自定義內容(可塞入 component)">
      <ReButton @click="openDrawerWithComponent">Open Modal With Component</ReButton>
    </dev-section>
    <dev-section title="抽屜中的抽屜">
      <ReButton @click="opevDrawerWithInnevDrawer">Inner modal</ReButton>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReButton from '@/components/ReButton.vue';
import useDrawer from '@/hooks/useDrawer';
import DevDrawerContent from '@/forDev/components/DevDrawerContent.vue';
import DevDrawerInnerDrawer from '@/forDev/components/DevDrawerInnerDrawer.vue';

export default defineComponent({
  name: 'ViewDrawer',
  components: {
    ReButton,
  },
  setup() {
    const { drawer } = useDrawer();

    const openDrawer = async () => {
      const drawer1 = await drawer({
        content: '這裡可以寫一些訊息 default ',
        data: {
          a: 1,
          b: 'str',
          c: true,
        },
      });

      console.log('drawer1', drawer1);
    };

    const openDrawerWithDefaultBtns = async () => {
      const drawer2 = await drawer({
        content: '這裡可以寫一些訊息 with btns',
        data: {
          a: 2,
          b: 'str',
          c: true,
        },
        btns: [
          {
            label: '確認',
            cb: () => {
              console.log('success');
            },
          },
          {
            label: '取消',
            cb: () => {
              console.log('cancel');
            },
          },
          {
            label: '測試',
            cb: () => {
              console.log('test');
            },
          },
        ],
      });

      console.log('drawer2', drawer2);
    };

    const openDrawerWithComponent = async () => {
      const drawer3 = await drawer({
        data: {
          a: 3,
          b: 'str',
          c: true,
        },
        render: DevDrawerContent,
      });

      console.log('drawer3', drawer3);
    };

    const opevDrawerWithInnevDrawer = async () => {
      const drawer4 = await drawer({
        data: {
          a: 4,
          b: 'str',
          c: true,
        },
        render: DevDrawerInnerDrawer,
      });

      console.log('drawer4', drawer4);
    };

    return {
      openDrawer,
      openDrawerWithDefaultBtns,
      openDrawerWithComponent,
      opevDrawerWithInnevDrawer,
    };
  },
});
</script>

<style lang="scss" scoped></style>
