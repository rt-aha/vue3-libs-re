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

    <dev-section title="下拉選單位置">
      <div class="wrap">
        <dev-desc api="props" type="String">align: left | center | right, default: left</dev-desc>

        <div class="wrap-comps">
          <div class="wrap-comps__comp">
            <ReDropdown v-model="value4" :options="renderOptions" align="left" />
          </div>
          <div class="wrap-comps__comp">
            <ReDropdown v-model="value5" :options="renderOptions" align="center" />
          </div>
          <div class="wrap-comps__comp">
            <ReDropdown v-model="value6" :options="renderOptions" align="right" />
          </div>
        </div>
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
    const value3 = ref('phone');
    const value4 = ref('phone');
    const value5 = ref('phone');
    const value6 = ref('phone');

    return {
      basicOptions,
      basicWithDisabledOptions,
      renderOptions,
      value1,
      value2,
      value3,
      value4,
      value5,
      value6,
    };
  },
});
</script>
