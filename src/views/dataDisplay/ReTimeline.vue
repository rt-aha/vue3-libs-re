<template>
  <div class="v-timeline">
    <dev-section title="基本使用">
      <ReTimeline :config="config" />
    </dev-section>

    <dev-section title="插入自訂義組件">
      <ReTimeline :config="config2" />
    </dev-section>
  </div>
</template>

<script setup>
import ReTimeline from '@/components/dataDisplay/ReTimeline.vue';
import DevTimelineContent from '@/forDev/components/DevTimelineContent.vue';

const config = [
  {
    title: '標題1',
    text: 'text1',
  },
  {
    title: '標題2',
    text: 'text2',
  },
  {
    title: '標題3',
    text: 'text3',
  },
];

const config2 = [
  {
    title: '標題1',
    text: 'text1',
  },
  {
    title: '標題2',
    text: 'text2',
    render: DevTimelineContent,
  },
  {
    title: '標題3',
    text: 'text3',
  },
];
</script>

<style lang="scss" scoped>
</style>
