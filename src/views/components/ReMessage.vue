<template>
  <div class="v-message">
    <re-button @click="onError">Error</re-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReMessage from '@/components/ReMessage/message';
import ReButton from '@/components/ReButton.vue';

export default defineComponent({
  name: 'ViewMessage',
  components: {
    ReButton,
  },
  setup() {
    const onError = () => {
      ReMessage({ text: '登录失败', type: 'error' });
      ReMessage({ text: '登录失败', type: 'error' });
      ReMessage({ text: '登录失败', type: 'error' });
    };

    return {
      onError,
    };
  },
});
</script>

<style lang="scss" scoped></style>
