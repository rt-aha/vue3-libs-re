<template>
  <div class="v-re-select">
    <dev-section title="基本使用">
      <div class="wrap">
        <dev-props type="{label: String: value: String}[]" prop-name="options" text="基本設定" />
        <ReSelect v-model="value1" :options="basicOptions" />
      </div>
    </dev-section>
    <dev-section title="禁用，整個select">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="disabled" text="禁用，整個select" />
        <ReSelect v-model="value2" :options="basicWithDisabledOptions" disabled />
      </div>
    </dev-section>
    <dev-section title="禁用選項">
      <div class="wrap">
        <dev-props type="{...args, disabled: true}[]" prop-name="options" text="禁用選項" />
        <ReSelect v-model="value2" :options="basicWithDisabledOptions" />
      </div>
    </dev-section>
    <dev-section title="自定義內容">
      <div class="wrap">
        <dev-props type="{...args, render: h()}[]" prop-name="options" text="render 可為一個 .vue 檔" />
        <ReSelect v-model="value3" :options="renderOptions" />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReSelect from '@/components/dataInput/ReSelect.vue';
import {
  basicOptions,
  basicWithDisabledOptions,
  renderOptions,
  renderWithDisabledOptions,
} from '@/config/mockOptions.js';

export default defineComponent({
  name: 'ViewReSelect',
  components: {
    ReSelect,
  },
  setup() {
    const value1 = ref('option1');
    const value2 = ref('');
    const value3 = ref('');
    const value4 = ref([]);
    const value5 = ref([]);

    return {
      basicOptions,
      basicWithDisabledOptions,
      renderOptions,
      renderWithDisabledOptions,
      // phoneOptions3,
      value1,
      value2,
      value3,
      value4,
      value5,
    };
  },
});
</script>

<style lang="scss" scoped></style>
