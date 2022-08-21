<template>
  <div class="v-re-radio">
    <dev-section title="基本使用">
      <div>
        <dev-desc api="props" type="Array">optionConfig: e.g. [{label: 'aaa': value: 'aaa'}]</dev-desc>
        <ReRadio v-model="value1" :optionConfig="phoneOptions" />
      </div>
    </dev-section>

    <dev-section title="直的排列">
      <div>
        <dev-desc type="String">direction: 'verticle' </dev-desc>
        <ReRadio v-model="value1" :optionConfig="phoneOptions" direction="verticle" />
      </div>
    </dev-section>

    <dev-section title="自定義內容">
      <div>
        <dev-desc api="props" type="Array">optionConfig: e.g. [{...props, render: renderFunction}]</dev-desc>
        <ReRadio v-model="value1" :optionConfig="phoneOptions2" />
      </div>
    </dev-section>

    <dev-section title="禁用">
      <div>
        <dev-desc api="props" type="Array">optionConfig: e.g. [{...props, disabled: true}]</dev-desc>
        <ReRadio v-model="value1" :optionConfig="phoneOptions3" />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReRadio from '@/components/ReRadio.vue';
import { phoneOptions, phoneOptions2, phoneOptions3 } from '@/config/mockOptions';

export default defineComponent({
  name: 'ViewReRadio',
  components: {
    ReRadio,
  },
  setup() {
    const value1 = ref('apple');

    return {
      value1,
      phoneOptions,
      phoneOptions2,
      phoneOptions3,
    };
  },
});
</script>

<style lang="scss" scoped></style>
