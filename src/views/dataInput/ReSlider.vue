<template>
  <div class="v-slider">
    <dev-section title="基本使用">
      <div class="wrap">
        <dev-desc text="v-model 數值介於 0 ~ 100" />
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

    <dev-section title="顯示極值">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="show-limit" text="顯示滑快兩端數值，兩端點不會有小圓點，預設 false" />
        <div :style="{ 'margin-top': '30px' }">
          <ReSlider v-model="val33" show-limit />
        </div>
      </div>
    </dev-section>

    <dev-section title="標記數值＆顯示極值">
      <div class="wrap">
        <dev-desc text="同時使用標記數值＆顯示極值" />
        <div :style="{ 'margin-top': '30px' }">
          <ReSlider v-model="val333" :marks="marks" show-limit />
        </div>
      </div>
    </dev-section>

    <dev-section title="限制可選值">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="limit-marks" text="限制可選數值，需搭配 marks 使用，預設 false" />
        <dev-desc text="若預設值不在限制值上，初始化會自動校正至最靠近的限制點" />
        <dev-desc text="e.g. v-model=37" />
        <div :style="{ 'margin-top': '30px' }">
          <ReSlider v-model="val4" :marks="limitMarks" limit-marks />
        </div>

        <dev-desc text="e.g. v-model=38" />
        <div :style="{ 'margin-top': '30px' }">
          <ReSlider v-model="val5" :marks="limitMarks" limit-marks />
        </div>
      </div>
    </dev-section>

    <dev-section title="格式化顯示數值">
      <div class="wrap">
        <dev-props type="Function" prop-name="formatShowValue" text="會同時作用於 marks 和 tooltip" />
        <dev-desc text="e.g. 所有數值 * 2" />
        <div :style="{ 'margin-top': '30px' }">
          <ReSlider v-model="val55" :format-show-value="formatShowValue" :marks="marks" show-limit tooltip />
        </div>
      </div>
    </dev-section>

    <dev-section title="範圍">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="range" text="可選範圍" />
        <ReSlider v-model="val6" range />
      </div>
    </dev-section>

    <dev-section title="範圍，顯示數值">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="tooltip" text="hover 圓點可看到數值" />
        <ReSlider v-model="val7" range tooltip />
      </div>
    </dev-section>

    <dev-section title="範圍，限制可選值">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="limit-marks" text="標記數值, 若不在校正點上，會直接校正為最靠近的點" />
        <div :style="{ 'margin-top': '30px' }">
          <ReSlider v-model="val8" range tooltip :marks="limitMarks" limit-marks />
        </div>
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import ReSlider from '@/components/dataInput/ReSlider.vue';

const val1 = ref(10);
const val11 = ref([40, 60]);
const val2 = ref(20);
const val3 = ref(23);
const val33 = ref(54);
const val333 = ref(12);
const val4 = ref(37);
const val5 = ref(38);
const val55 = ref(38);
const val6 = ref([40, 60]);
const val7 = ref([33, 91]);
const val8 = ref([30, 70]);

const marks = {
  10: '10%',
  20: '',
  50: '中間',
  77: '好數字',
};

const limitMarks = {
  25: '',
  50: '',
  75: '',
};

const formatShowValue = (val) => {
  return val * 2;
};
</script>

<style lang="scss" scoped>
</style>
