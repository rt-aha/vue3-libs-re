<template>
  <div class="v-dropdown">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReDropdown v-model="value1" :options="basicOptions" />
      </div>
    </dev-section>
    <dev-section title="禁用">
      <div class="wrap">
        <dev-desc type="boolean">disabled：禁用</dev-desc>
        <ReDropdown v-model="value2" :options="basicWithDisabledOptions" />
      </div>
    </dev-section>
    <dev-section title="自定義內容">
      <div class="wrap">
        <dev-desc api="props" type="Array">options: e.g. [{...props, render: renderFunction}]</dev-desc>
        <ReDropdown v-model="value3" :options="renderOptions" />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReDropdown from '@/components/ReDropdown.vue';
import { basicOptions, basicWithDisabledOptions, renderOptions } from '@/config/mockOptions.js';

export default defineComponent({
  name: 'ViewDropdown',
  components: {
    ReDropdown,
  },
  setup() {
    const value1 = ref('option1');
    const value2 = ref('option1');
    const value3 = ref('Pixel 6');

    return {
      basicOptions,
      basicWithDisabledOptions,
      renderOptions,
      value1,
      value2,
      value3,
    };
  },
});
</script>

<style lang="scss" scoped></style>
