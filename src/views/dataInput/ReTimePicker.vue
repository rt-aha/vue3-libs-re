<template>
  <div class="v-re-time-picker">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReTimePicker v-model="time" />
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import ReTimePicker from '@/components/dataInput//timePicker/ReTimePickerIndex.vue';

const time = ref(new Date());
</script>

<style lang="scss" scoped></style>
