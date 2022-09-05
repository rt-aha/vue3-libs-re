<template>
  <div class="v-input-number">
    <dev-section title="基本使用">
      <div class="wrap">
        <re-input-number v-model="value1" />
      </div>
    </dev-section>

    <dev-section title="基本使用">
      <div class="wrap">
        <dev-desc type="boolean">disabled：禁用</dev-desc>
        <re-input-number v-model="value1" disabled />
      </div>
    </dev-section>

    <dev-section title="階層">
      <div class="wrap">
        <dev-desc type="Number, String">step：間隔 e.g. 2</dev-desc>
        <re-input-number v-model="value2" step="2" />

        <dev-desc type="Number, String" mt>step：間隔 e.g. 0.1</dev-desc>
        <re-input-number v-model="value3" step="0.1" />
      </div>
    </dev-section>

    <dev-section title="最大值、最小值 ">
      <div class="wrap">
        <dev-desc api="String, Number">max：最大值 e.g. 3</dev-desc>
        <re-input-number v-model="value4" max="3" />

        <dev-desc api="String, Number" mt>min：最小值 e.g. -5</dev-desc>
        <re-input-number v-model="value5" min="-5" />
      </div>
    </dev-section>

    <dev-section title="前綴與後綴 ">
      <div class="wrap">
        <dev-desc api="slot">prefix</dev-desc>
        <re-input-number v-model="value6">
          <template #prefix>
            <img class="dollar-icon" src="@/assets/icon/dollar2.svg" />
          </template>
        </re-input-number>

        <dev-desc api="slot" mt>suffix</dev-desc>
        <re-input-number v-model="value7">
          <template #suffix>
            <img class="percentage-icon" src="@/assets/icon/percentage.svg" />
          </template>
        </re-input-number>
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReInputNumber from '@/components/ReInputNumber.vue';

export default defineComponent({
  name: 'ViewInputNumber',
  components: {
    ReInputNumber,
  },
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref('');
    const value4 = ref('');
    const value5 = ref('');
    const value6 = ref('');
    const value7 = ref('');

    return {
      value1,
      value2,
      value3,
      value4,
      value5,
      value6,
      value7,
    };
  },
});
</script>

<style lang="scss" scoped>
.dollar-icon {
  width: 20px;
}

.percentage-icon {
  width: 20px;
}
</style>
