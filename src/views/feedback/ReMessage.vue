<template>
  <div class="v-message">
    <ReButton @click="showMessage">
      message
    </ReButton>

    <Teleport to="#message-target">
      <ReMessage v-if="visible" :content="content" @close="close" />
      <!-- <ReMessage v-if="visible" :content="content" @close="close" /> -->
    </Teleport>
  </div>
</template>

<script setup>
import ReMessage from '@/components/feedback/ReMessage.vue';
import ReButton from '@/components/common/ReButton.vue';

const visible = ref(false);

const close = () => {
  visible.value = false;
};

const content = ref(`'NEW MESSAGE'${Date.now()}`);

const genContent = () => {
  content.value = `'NEW MESSAGE'${Date.now()}`;
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

const showMessage = () => {
  genContent();
  visible.value = true;
};

createAppendDom('message-target');
</script>

<style lang="scss" scoped></style>
