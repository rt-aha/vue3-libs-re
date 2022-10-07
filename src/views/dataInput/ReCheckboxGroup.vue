<template>
  <div class="v-re-checkbox">
    <dev-section title="多選項">
      <div>
        <dev-props type="{label: String: value: String}[]" prop-name="options" text="基本設定" />
        <ReCheckboxGroup v-model="value4" :options="phoneOptions" />
      </div>
    </dev-section>

    <dev-section title="直的排列">
      <div>
        <dev-props type="String" prop-name="direction" text="vertical: 排列直的方向, horizontal: 橫的排列方向" />
        <ReCheckboxGroup v-model="value5" :options="phoneOptions" direction="verticle" />
      </div>
    </dev-section>
    <dev-section title="自定義內容">
      <div>
        <dev-props type="{...args, render: h()}[]" prop-name="options" text="render 可為一個 .vue 檔" />
        <ReCheckboxGroup v-model="value6" :options="phoneOptions2" />
      </div>
    </dev-section>

    <dev-section title="禁用">
      <div>
        <dev-props type="{...args, disabled: true}[]" prop-name="options" text="禁用選項" />
        <ReCheckboxGroup v-model="value7" :options="phoneOptions3" />
      </div>
    </dev-section>

    <dev-section title="checkbox被點擊時">
      <div>
        <dev-events type="Function" event-name="onChange" text="點擊時觸發" />
        <ReCheckboxGroup v-model="value7" :options="phoneOptions2" @onChange="onCheckboxGroupChange" />
      </div>
    </dev-section>

    <dev-section title="全選">
      <div>
        <dev-props type="Boolean" prop-name="check-all" text="顯示全選選項" />
        <ReCheckboxGroup v-model="value8" :options="phoneOptions2" check-all @onChange="onCheckboxGroupChange" />
      </div>
    </dev-section>

    <dev-section title="全選選項與選項垂直排列">
      <div>
        <dev-props type="String" prop-name="check-all-direction" text="verticle: 全選選項單獨一行" />
        <ReCheckboxGroup
          v-model="value8"
          :options="phoneOptions2"
          check-all
          check-all-direction="verticle"
          @onChange="onCheckboxGroupChange"
        />
      </div>
    </dev-section>

    <dev-section title="設定可選取上限">
      <div>
        <dev-props type="String | Number" prop-name="limit" text="可選取數量的上限" />
        <dev-desc text="e.g. 2 個" />
        <ReCheckboxGroup v-model="value9" :options="phoneOptions2" limit="2" />

        <dev-desc text="e.g. 3 個，原有選項中即有 disabled 選項時" mt />
        <ReCheckboxGroup v-model="value10" :options="phoneOptions3" limit="3" />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReCheckboxGroup from '@/components/dataInput/ReCheckboxGroup.vue';
import { phoneOptions, phoneOptions2, phoneOptions3, singleOption } from '@/config/mockOptions';
import CheckboxContent from '@/forDev/testcomponents/CheckboxContent.vue';

export default defineComponent({
  name: 'ViewReCheckbox',
  components: {
    ReCheckboxGroup,
  },
  setup() {
    const value1 = ref(false);
    const value2 = ref(false);
    const value3 = ref(false);
    const value4 = ref(['pixel-6-black']);
    const value5 = ref(['pixel-6-black']);
    const value6 = ref(['pixel-6-black']);
    const value7 = ref(['pixel-6-black']);
    const value8 = ref(['pixel-6-black']);
    const value9 = ref(['pixel-6-black']);
    const value10 = ref(['pixel-6-black']);

    const onCheckboxChange = (updateValue) => {
      console.log('updateValue...', updateValue);
    };

    const onCheckboxGroupChange = (actionType, modifiedOpt, updateValue) => {
      console.log('actionType...', actionType);
      console.log('modifiedOpt...', modifiedOpt);
      console.log('updateValue...', updateValue);
    };

    return {
      value1,
      value2,
      value3,
      value4,
      value5,
      value6,
      value7,
      value8,
      value9,
      value10,
      singleOption,
      phoneOptions,
      phoneOptions2,
      phoneOptions3,
      CheckboxContent,
      onCheckboxChange,
      onCheckboxGroupChange,
    };
  },
});
</script>
