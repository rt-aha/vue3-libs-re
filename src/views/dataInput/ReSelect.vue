<template>
  <div class="v-re-select">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReSelect v-model="value1" :options="basicOptions" />
      </div>
    </dev-section>
    <dev-section title="禁用">
      <div class="wrap">
        <dev-desc type="boolean">
          disabled：禁用
        </dev-desc>
        <ReSelect v-model="value2" :options="basicWithDisabledOptions" />
      </div>
    </dev-section>
    <dev-section title="自定義內容">
      <div class="wrap">
        <dev-desc api="props" type="Array">
          options: e.g. [{...props, render: renderFunction}]
        </dev-desc>
        <ReSelect v-model="value3" :options="renderOptions" />
      </div>
    </dev-section>
    <dev-section title="多選">
      <div class="wrap">
        <dev-desc type="boolean">
          multiple：是否可多選
        </dev-desc>
        <ReSelect v-model="value4" :options="basicOptions" multiple />
      </div>
    </dev-section>
    <dev-section title="多選且自定義">
      <div class="wrap">
        <ReSelect v-model="value5" :options="renderWithDisabledOptions" multiple />
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
    const value1 = ref('');
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
