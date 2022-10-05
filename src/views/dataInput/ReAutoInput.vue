<template>
  <div class="v-auto-input">
    <dev-section title="基本使用">
      <ReAutoInput v-model="val1" />
    </dev-section>

    <dev-section title="自行決定個數">
      <ReAutoInput v-model="val2" count="4" />
    </dev-section>

    <dev-section title="尺寸">
      <ReAutoInput v-model="val3" size="small" />
    </dev-section>

    <dev-section title="每次變動時 onChange callback">
      <ReAutoInput v-model="val4" @onChange="onChange" />
    </dev-section>

    <dev-section title="填完最後一個後 callback">
      <ReAutoInput v-model="val5" @onCompleted="onCompleted" />
    </dev-section>
  </div>
</template>

<script setup>
import ReAutoInput from '@/components/dataInput/ReAutoInput.vue';

const val1 = ref('');
const val2 = ref('');
const val3 = ref('');
const val4 = ref('');
const val5 = ref('');

const onChange = (val) => {
  console.log('onChange', val);
};

const onCompleted = (val) => {
  console.log('onCompleted', val);
};
</script>

<style lang="scss" scoped>
</style>
