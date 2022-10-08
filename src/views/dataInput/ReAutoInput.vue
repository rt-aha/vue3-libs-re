<template>
  <div class="v-auto-input">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReAutoInput v-model="val1" />
      </div>
    </dev-section>

    <dev-section title="自行決定個數">
      <div class="wrap">
        <dev-props type="String" prop-name="count" text="決定有幾個格子" />
        <dev-desc text="e.g. 4" />
        <ReAutoInput v-model="val2" count="4" />
      </div>
    </dev-section>

    <dev-section title="尺寸">
      <div class="wrap">
        <dev-props type="String" prop-name="size" text="尺寸" />
        <dev-desc text="e.g. small" />
        <ReAutoInput v-model="val3" size="small" />
      </div>
    </dev-section>

    <dev-section title="每次變動時 onChange callback">
      <div class="wrap">
        <dev-events type="Function" event-name="onChange" text="每次輸入有更新時觸發" />
        <ReAutoInput v-model="val4" @onChange="onChange" />
      </div>
    </dev-section>

    <dev-section title="填完最後一個後 callback">
      <div class="wrap">
        <dev-events type="Function" event-name="onCompleted" text="格子輸入滿格子時的觸發" />
        <ReAutoInput v-model="val5" @onCompleted="onCompleted" />
      </div>
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
