<template>
  <div class="v-re-time-picker">
    <ReTimePicker v-model="time" />
  </div>
</template>

<script setup>
import ReTimePicker from '@/components/ReTimePicker/index.vue';

const time = ref(new Date());
</script>

<style lang="scss" scoped></style>
