<template>
  <div class="v-re-checkbox">
    <dev-title size="main">re-checkbox 組件</dev-title>
    <dev-section title="單個選項時">
      <div>
        <dev-desc api="props" type="String">label: 選項名字</dev-desc>
        <re-checkbox v-model="value1" label="我同意協議書內容" />
      </div>
    </dev-section>

    <dev-section title="單個選項時，自定義內容">
      <div>
        <dev-desc api="props" type="Function">render: .vue 組件/渲染函式</dev-desc>
        <re-checkbox v-model="value2" :render="CheckboxContent" />
      </div>
    </dev-section>

    <dev-section title="禁用">
      <div>
        <dev-desc api="props" type="Boolean">disabled: 是否禁用</dev-desc>
        <re-checkbox v-model="value3" label="是否啟用" :optionConfig="phoneOptions3" disabled />
      </div>
    </dev-section>

    <dev-section title="checkbox被點擊時">
      <div>
        <dev-desc api="event">change 事件：點擊時觸發</dev-desc>
        <re-checkbox v-model="value1" label="我同意協議書內容" @onChange="onCheckboxChange" />
      </div>
    </dev-section>

    <dev-title size="main">re-checkbox-group 組件</dev-title>
    <dev-section title="多選項">
      <div>
        <dev-desc api="props" type="Array">optionConfig: e.g. [{label: 'aaa': value: 'aaa'}]</dev-desc>
        <re-checkbox-group v-model="value4" :optionConfig="phoneOptions" />
      </div>
    </dev-section>

    <dev-section title="直的排列">
      <div>
        <dev-desc type="String">direction: 'verticle' </dev-desc>
        <re-checkbox-group v-model="value5" :optionConfig="phoneOptions" direction="verticle" />
      </div>
    </dev-section>
    <dev-section title="自定義內容">
      <div>
        <dev-desc api="props" type="Array">optionConfig: e.g. [{...props, render: renderFunction}]</dev-desc>
        <re-checkbox-group v-model="value6" :optionConfig="phoneOptions2" />
      </div>
    </dev-section>

    <dev-section title="禁用">
      <div>
        <dev-desc api="props" type="Array">optionConfig: e.g. [{...props, disabled: true}]</dev-desc>
        <re-checkbox-group v-model="value7" :optionConfig="phoneOptions3" />
      </div>
    </dev-section>

    <dev-section title="checkbox被點擊時">
      <div>
        <dev-desc api="event">change 事件：點擊時觸發</dev-desc>
        <re-checkbox-group v-model="value7" :optionConfig="phoneOptions2" @onChange="onCheckboxGroupChange" />
      </div>
    </dev-section>

    <dev-section title="全選">
      <div>
        <dev-desc type="boolean">
          checkAll: 是否顯示全選按鈕（註：亦可由外部控制 v-model 值，但由 checkAll 可觸發組件內 onChange 事件）
        </dev-desc>
        <re-checkbox-group v-model="value8" :optionConfig="phoneOptions2" @onChange="onCheckboxGroupChange" checkAll />
      </div>
    </dev-section>

    <dev-section title="全選選項與選項垂直排列">
      <div>
        <dev-desc type="String">checkAllDirection: 'verticle' </dev-desc>
        <re-checkbox-group
          v-model="value8"
          :optionConfig="phoneOptions2"
          @onChange="onCheckboxGroupChange"
          checkAll
          checkAllDirection="verticle"
        />
      </div>
    </dev-section>

    <dev-section title="設定可選取上限">
      <div>
        <dev-desc type="String, Number">limit: 可選取數量的上限 e.g. 2 個</dev-desc>
        <re-checkbox-group v-model="value9" :optionConfig="phoneOptions2" limit="2" />

        <dev-desc type="String, Number">limit: 可選取數量的上限 e.g. 3 個，原有選項中即有 disabled 選項時</dev-desc>
        <re-checkbox-group v-model="value10" :optionConfig="phoneOptions3" limit="3" />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReCheckbox from '@/components/ReCheckbox.vue';
import ReCheckboxGroup from '@/components/ReCheckboxGroup.vue';
import { singleOption, phoneOptions, phoneOptions2, phoneOptions3 } from '@/config/mockOptions';
import CheckboxContent from '@/forDev/testComponents/CheckboxContent.vue';

export default defineComponent({
  name: 'ViewReCheckbox',
  components: {
    ReCheckbox,
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
