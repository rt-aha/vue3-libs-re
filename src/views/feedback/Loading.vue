<template>
  <div class="v-loading">
    <dev-section title="基本使用">
      <Loading />
    </dev-section>
  </div>
</template>

<script>
import Loading from '@/components/feedback/ReLoading.vue';

export default {
  name: 'ViewLoading',
  components: {
    Loading,
  },
};
</script>

<style></style>
