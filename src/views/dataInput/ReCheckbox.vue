<template>
  <div class="v-re-checkbox">
    <dev-section title="單選項">
      <div>
        <dev-props type="String" prop-name="label" text="選項名字" />
        <ReCheckbox v-model="value1" label="我同意協議書內容" />
      </div>
    </dev-section>

    <dev-section title="單選項，自定義內容">
      <div>
        <dev-props type="Function" prop-name="render" text="render 可為一個 .vue 檔" />
        <ReCheckbox v-model="value2" :render="CheckboxContent" />
      </div>
    </dev-section>

    <dev-section title="禁用">
      <div>
        <dev-props type="Boolean" prop-name="disabled" text="禁用" />
        <ReCheckbox v-model="value3" label="是否啟用" :options="phoneOptions3" disabled />
      </div>
    </dev-section>

    <dev-section title="checkbox被點擊時">
      <div>
        <dev-events type="Function" event-name="onChange" text="點擊時觸發" />
        <ReCheckbox v-model="value1" label="我同意協議書內容" @onChange="onCheckboxChange" />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReCheckbox from '@/components/dataInput/ReCheckbox.vue';
import { phoneOptions, phoneOptions2, phoneOptions3, singleOption } from '@/config/mockOptions';
import CheckboxContent from '@/forDev/testComponents/CheckboxContent.vue';

export default defineComponent({
  name: 'ViewReCheckbox',
  components: {
    ReCheckbox,
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
