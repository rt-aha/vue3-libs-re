<template>
  <div class="v-auto-input">
    <ReAutoInput v-model="val" />
  </div>
</template>

<script setup>
import ReAutoInput from '@/components/dataInput/ReAutoInput.vue';

const val = ref('');
</script>

<style lang="scss" scoped>
</style>
