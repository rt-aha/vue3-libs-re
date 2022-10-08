<template>
  <div class="v-date-picker">
    <dev-section title="基本使用">
      <ReDatePicker v-model="value" />
    </dev-section>
  </div>
</template>

<script setup>
import ReDatePicker from '@/components/dataInput/ReDatePicker.vue';

const value = ref(new Date());
</script>

<style lang="scss" scoped></style>
