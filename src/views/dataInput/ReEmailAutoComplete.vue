<template>
  <div class="v-re-email-auto-complete">
    <dev-section title="基本使用">
      <ReEmailAutoComplete v-model="value" />
    </dev-section>
  </div>
</template>

<script setup>
import ReEmailAutoComplete from '@/components/dataInput/ReEmailAutoComplete.vue';

const value = ref('');
</script>

<style lang="scss" scoped></style>
