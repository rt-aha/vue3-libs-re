<template>
  <div class="v-input-number">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReInputNumber v-model="value1" />
      </div>
    </dev-section>

    <dev-section title="禁用">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="disabled" text="禁用" />
        <ReInputNumber v-model="value1" disabled />
      </div>
    </dev-section>

    <dev-section title="階層">
      <div class="wrap">
        <dev-props type="Number, String" prop-name="step" text="設定增減幅度" />
        <dev-desc text="e.g. 2" />
        <ReInputNumber v-model="value2" step="2" />

        <dev-desc text="e.g. 0.1" mt />
        <ReInputNumber v-model="value3" step="0.1" />
      </div>
    </dev-section>

    <dev-section title="最大值、最小值 ">
      <div class="wrap">
        <dev-props type="Number, String" prop-name="max" text="最大值" />
        <dev-desc text="e.g. 3" />
        <ReInputNumber v-model="value4" max="3" />

        <dev-props type="Number, String" prop-name="min" text="最小值" mt />
        <dev-desc text="e.g. -5" />
        <ReInputNumber v-model="value5" min="-5" />
      </div>
    </dev-section>

    <dev-section title="前綴與後綴 ">
      <div class="wrap">
        <dev-slots slot-name="prefix" text="前綴" />
        <ReInputNumber v-model="value6">
          <template #prefix>
            <img class="dollar-icon" src="@/assets/icon/dollar2.svg">
          </template>
        </ReInputNumber>

        <dev-slots slot-name="suffix" text="後綴" mt />
        <ReInputNumber v-model="value7">
          <template #suffix>
            <img class="percentage-icon" src="@/assets/icon/percentage.svg">
          </template>
        </ReInputNumber>
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReInputNumber from '@/components/dataInput/ReInputNumber.vue';

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
