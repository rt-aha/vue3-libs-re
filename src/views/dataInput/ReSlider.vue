<template>
  <div class="v-slider">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReSlider v-model="val1" />
      </div>
    </dev-section>
    <dev-section title="顯示數值">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="tooltip" text="hover 圓點可看到數值" />
        <ReSlider v-model="val2" tooltip />
      </div>
    </dev-section>
    <dev-section title="標記數值">
      <div class="wrap">
        <dev-props type="{(數字): ('說明文字')}[]" prop-name="marks" text="標記數值" />
        <dev-desc text="e.g. {10: '10', 20: '', 50: '中間', 77: '好數字'}" />
        <div :style="{ 'margin-top': '30px' }">
          <ReSlider v-model="val3" :marks="marks" />
        </div>
      </div>
    </dev-section>

    <dev-section title="限制可選值">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="limit-marks" text="限制可選數值，需搭配 marks 使用，預設 false" />
        <div :style="{ 'margin-top': '30px' }">
          <ReSlider v-model="val4" :marks="limitMarks" limit-marks />
        </div>
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import ReSlider from '@/components/dataInput/ReSlider.vue';

const val1 = ref(10);
const val2 = ref(20);
const val3 = ref(30);
const val4 = ref(40);

const marks = {
  10: '10',
  20: '',
  50: '中間',
  77: '好數字',
};

const limitMarks = {
  25: '',
  50: '',
  75: '',
};
</script>

<style lang="scss" scoped>
</style>
