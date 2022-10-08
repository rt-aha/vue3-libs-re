<template>
  <div class="v-steps">
    <dev-section title="基本使用">
      <div class="wrap">
        <dev-props type="{label: string: desc: string}[]" prop-name="config" text="基本設定" />
        <dev-desc text="優先度: error > pending > current" />
        <dev-desc text="e.g. v-model={type: 'current', index: 0}" />
        <ReSteps v-model="val1" :config="config1" />

        <dev-desc text="e.g. v-model={type: 'current', index: 2}" mt />
        <ReSteps v-model="val2" :config="config1" />
      </div>
    </dev-section>

    <dev-section title="錯誤 error">
      <div class="wrap">
        <dev-desc text="e.g. v-model={type: 'current', index: 1}" />
        <ReSteps v-model="val3" :config="config1" />
      </div>
    </dev-section>

    <dev-section title="等待 pending">
      <div class="wrap">
        <dev-desc text="e.g. v-model={type: 'pending', index: 3}" />
        <ReSteps v-model="val4" :config="config1" />
      </div>
    </dev-section>

    <dev-section title="自訂義內容">
      <div class="wrap">
        <dev-props type="{...args, render: h()}[]" prop-name="options" text="render 可為一個 .vue 檔" />
        <ReSteps v-model="val5" :config="config2" />
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import ReSteps from '@/components/feedback/ReSteps.vue';
import DevStepContent from '@/forDev/testComponents/DevStepContent.vue';
const mockDesc = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';

const val1 = ref({
  type: 'current',
  index: 0,
});

const val2 = ref({
  type: 'current',
  index: 2,
});

const val3 = ref({
  type: 'error',
  index: 1,
});

const val4 = ref({
  type: 'pending',
  index: 3,
});

const val5 = ref({
  type: 'current',
  index: 2,
});

const config1 = [
  {
    title: '步驟標題1',
    desc: `內容1 ${mockDesc}`,
  },
  {
    title: '步驟標題2',
    desc: `內容2 ${mockDesc}`,
  },
  {
    title: '步驟標題3',
    desc: `內容3 ${mockDesc}`,
  },
  {
    title: '步驟標題4',
    desc: `內容4 ${mockDesc}`,
  },
];

const config2 = [
  {
    title: '步驟標題1',
    desc: `內容1 ${mockDesc}`,
  },
  {
    title: '步驟標題2',
    render: DevStepContent,
  },
  {
    title: '步驟標題3',
    desc: `內容3 ${mockDesc}`,
  },

];
</script>

<style lang="scss" scoped>
</style>
