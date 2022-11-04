<template>
  <div class="v-modal">
    <dev-section title="基本使用：直接寫在模板上">
      <ReButton @click="switchVisible">
        Open Modal
      </ReButton>
    </dev-section>

    <dev-section title="基本使用：用 function">
      <ReButton @click="openModal">
        Open Modal
      </ReButton>
    </dev-section>

    <dev-section title="使用預設按鈕">
      <ReButton @click="openModalWithDefaultBtns">
        Open Modal With Default Button
      </ReButton>
    </dev-section>

    <dev-section title="使用自定義內容(可塞入 component)">
      <ReButton @click="openModalWithComponent">
        Open Modal With Component
      </ReButton>
    </dev-section>

    <dev-section title="彈窗中的彈窗">
      <ReButton @click="openModalWithInnerModal">
        Inner modal
      </ReButton>
    </dev-section>

    <Teleport to="#modal-target">
      <ReModal :visible="visible" content="content" @close="switchVisible" />
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ReModal from '@/components/feedback/ReModal.vue';
import ReButton from '@/components/common/ReButton.vue';
import useModal from '@/hooks/useModal';
import DevModalContent from '@/forDev/components/DevModalContent.vue';
import DevModalInnerModal from '@/forDev/components/DevModalInnerModal.vue';

const { modal } = useModal();
const visible = ref(false);

const switchVisible = () => {
  console.log('?', visible.value);
  visible.value = !visible.value;
};

const openModal = async () => {
  const modal1 = await modal({
    content: '這裡可以寫一些訊息 default ',
    data: {
      a: 1,
      b: 'str',
      c: true,
    },
  });

  console.log('modal1', modal1);
};

const openModalWithDefaultBtns = async () => {
  const modal2 = await modal({
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

  console.log('modal2', modal2);
};

const openModalWithComponent = async () => {
  const modal3 = await modal({
    data: {
      a: 3,
      b: 'str',
      c: true,
    },
    render: DevModalContent,
  });

  console.log('modal3', modal3);
};

const openModalWithInnerModal = async () => {
  const modal4 = await modal({
    data: {
      a: 4,
      b: 'str',
      c: true,
    },
    render: DevModalInnerModal,
  });

  console.log('modal4', modal4);
};

const createAppendDom = (target) => {
  const targetEle = document.querySelector(`#${target}`);

  if (targetEle) {
    return;
  }

  const ele = document.createElement('div');
  ele.id = target;
  document.body.appendChild(ele);
};

createAppendDom('modal-target');
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 20%;
  left: 50%;
  z-index: 999;
  width: 300px;
  margin-left: -150px;
  background-color: #ccc;
}
</style>
