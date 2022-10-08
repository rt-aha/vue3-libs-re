<template>
  <div class="v-message">
    <ReButton @click="showMessage">
      message
    </ReButton>
  </div>
</template>

<script setup>
import ReMessage from '@/components/feedback/ReMessage.vue';
import ReButton from '@/components/common/ReButton.vue';
import useMessage from '@/hooks/useMessage';

const { message } = useMessage();

const showMessage = () => {
  message({
    content: 'message',
  });
};
</script>

<style lang="scss" scoped></style>
