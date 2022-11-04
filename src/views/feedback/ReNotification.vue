<template>
  <div class="v-notification">
    <dev-section title="基本使用">
      <ReButton @click="showNotification">
        Notification
      </ReButton>
    </dev-section>

    <Teleport to="#notification-target">
      <ReNotification v-if="visible" :content="content" @close="close" />
      <!-- <ReMessage v-if="visible" :content="content" @close="close" /> -->
    </Teleport>
  </div>
</template>

<script setup>
import ReNotification from '@/components/feedback/ReNotification.vue';
import ReButton from '@/components/common/ReButton.vue';

const visible = ref(false);

const close = () => {
  visible.value = false;
};

const content = ref(`'NEW Notification'${Date.now()}`);

const genContent = () => {
  content.value = `'NEW Notification'${Date.now()}`;
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

const showNotification = () => {
  genContent();
  visible.value = true;
};

createAppendDom('notification-target');
</script>

<style lang="scss" scoped>
</style>
