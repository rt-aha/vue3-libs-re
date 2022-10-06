<template>
  <div class="v-countdown">
    <dev-section title="基本使用">
      <ReCountdown />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReCountdown from '@/components/feedback/ReCountdown.vue';

export default defineComponent({
  name: 'ViewCountdown',
  components: {
    ReCountdown,
  },
});
</script>

<style lang="scss" scoped>
</style>
