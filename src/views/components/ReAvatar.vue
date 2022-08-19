<template>
  <div class="v-avatar">
    <ReAvatar />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReAvatar from '@/components/ReAvatar';

export default defineComponent({
  name: 'ViewAvatar',
  components: {
    ReAvatar,
  },
});
</script>

<style lang="scss" scoped></style>
