<template>
  <div class="v-transfer">
    <dev-section title="過濾輸入框">
      <div>
        <dev-desc api="props" type="Boolean">sourceFilter: 是否顯示來源輸入框</dev-desc>
        <re-transfer v-model="value3" :options="transferOptions" sourceFilter />
        <dev-desc api="props" type="Boolean" mt>targetFilter: 是否顯示已選擇輸入框 </dev-desc>
        <re-transfer v-model="value3" :options="transferOptions" targetFilter />
      </div>
    </dev-section>
    <dev-section title="基本使用">
      <div>
        分隔線現在是硬推的，處理一下 checkbox 的 css
        <dev-desc api="props" type="Array">options: e.g. [{label: 'aaa': value: 'aaa'}]</dev-desc>
        <re-transfer v-model="value1" :options="transferOptions" />
      </div>
    </dev-section>
    <dev-section title="選項自定義">
      <div>
        <dev-desc api="props" type="Array">options: e.g. [{...props, render: renderFunction}]</dev-desc>
        <re-transfer v-model="value2" :options="phoneOptions2" />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReTransfer from '@/components/ReTransfer.vue';
import { transferOptions, phoneOptions2 } from '@/config/mockOptions';

export default defineComponent({
  name: 'ViewTransfer',
  components: {
    ReTransfer,
  },
  setup() {
    const value1 = ref([
      'option1',
      'option2',
      'option3',
      'option4',
      'option5',
      'option6',
      'option7',
      'option8',
      'option9',
    ]);
    const value2 = ref([]);
    const value3 = ref(['option1', 'option2', 'option3', 'option4', 'option6', 'option7', 'option8', 'option9']);

    return {
      value1,
      value2,
      value3,
      transferOptions,
      phoneOptions2,
    };
  },
});
</script>

<style lang="scss" scoped></style>
