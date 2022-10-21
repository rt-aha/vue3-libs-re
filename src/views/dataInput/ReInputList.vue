<template>
  <div class="v-input-list">
    <dev-section title="基本使用">
      <ReInputList v-model="value" placeholder="請輸入" />
    </dev-section>
  </div>
</template>

<script setup>
import ReInputList from '@/components/dataInput/ReInputList.vue';

const value = ref([]);
</script>

<style lang="scss" scoped></style>
