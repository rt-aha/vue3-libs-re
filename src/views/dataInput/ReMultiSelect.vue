<template>
  <div class="v-re-select">
    <dev-section title="基本使用">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="multiple" text="基本使用" />
        <ReMultiSelect v-model="value1" :options="basicOptions" />
      </div>
    </dev-section>
    <dev-section title="禁用，整個select">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="disabled" text="禁用，整個select" />
        <ReMultiSelect v-model="value2" :options="basicWithDisabledOptions" disabled />
      </div>
    </dev-section>
    <dev-section title="禁用選項">
      <div class="wrap">
        <dev-props type="{...args, disabled: true}[]" prop-name="options" text="禁用選項" />
        <ReMultiSelect v-model="value3" :options="basicWithDisabledOptions" />
      </div>
    </dev-section>
    <dev-section title="選項自定義組件">
      <div class="wrap">
        <ReMultiSelect v-model="value4" :options="renderWithDisabledOptions" />
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ReMultiSelect from '@/components/dataInput/ReMultiSelect.vue';
import {
  basicOptions,
  basicWithDisabledOptions,
  renderOptions,
  renderWithDisabledOptions,
} from '@/config/mockOptions.js';

const value1 = ref([]);
const value2 = ref([]);
const value3 = ref([]);
const value4 = ref([]);
</script>

<style lang="scss" scoped></style>
