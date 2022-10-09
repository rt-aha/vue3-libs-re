<template>
  <div class="re-easy-form">
    <ReForm :form-value="innerForm" :form-rules="formRules">
      <ReFormGrid
        v-for="f of formConfig"
        :key="f.formKey"
        :form-key="f.formKey"
        :label="f.formItemLabel"
        :hint="f.hint"
        :layout="f.layout"
        :extra-setting="f.extraSetting"
      >
        <ReFormItem
          ref="formItemRef"
          :form-key="f.formKey"
          :label="f.formItem?.label || ''"
          :hint="f.formItem?.hint || ''"
          :required="f.formItem?.required || false"
          :hide="f.hide || false"
        >
          <component
            :is="`Re${f.compName}`"
            v-model="innerForm[f.formKey]"
            v-model:extraValue="innerForm[f.extraFormKey]"
            v-bind="f.compProps"
          />
        </ReFormItem>
      </ReFormGrid>
    </ReForm>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import ReForm from '@/components/dataInput/ReForm.vue';
import ReFormItem from '@/components/dataInput/ReFormItem.vue';
import ReFormGrid from '@/components/dataInput/ReFormGrid.vue';
import ReInput from '@/components/dataInput/ReInput.vue';
import ReInputNumber from '@/components/dataInput/ReInputNumber.vue';
import ReSelect from '@/components/dataInput/ReSelect.vue';
import ReRadio from '@/components/dataInput/ReRadio.vue';
import ReCheckbox from '@/components/dataInput/ReCheckbox.vue';
import ReCheckboxGroup from '@/components/dataInput/ReCheckboxGroup.vue';
import ReSwitch from '@/components/dataInput/ReSwitch.vue';
import ReTimePicker from '@/components/dataInput/timePicker/ReTimePickerIndex.vue';
import ReDatePicker from '@/components/dataInput/ReDatePicker.vue';
import ReDateRangePicker from '@/components/dataInput/ReDateRangePicker.vue';
import ReEmailAutoComplete from '@/components/dataInput/ReEmailAutoComplete.vue';
import ReUpload from '@/components/dataInput/ReUpload.vue';
import ReInputList from '@/components/dataInput/ReInputList.vue';
import ReSlider from '@/components/dataInput/ReSlider.vue';
import ReDependenceSelect from '@/components/dataInput/ReDependenceSelect.vue';
import ReMultiMultiCheckboxGroup from '@/components/dataInput/ReMultiMultiCheckboxGroup.vue';
import ReTextarea from '@/components/dataInput/ReTextarea.vue';
import ReMdEditor from '@/components/dataInput/ReMdEditor.vue';

export default defineComponent({
  components: {
    ReForm,
    ReFormItem,
    ReFormGrid,
    ReInput,
    ReInputNumber,
    ReSelect,
    ReRadio,
    ReCheckbox,
    ReCheckboxGroup,
    ReSwitch,
    ReTimePicker,
    ReDatePicker,
    ReDateRangePicker,
    ReEmailAutoComplete,
    ReUpload,
    ReInputList,
    ReDependenceSelect,
    ReMultiMultiCheckboxGroup,
    ReTextarea,
    ReMdEditor,
    ReSlider,
  },
  props: {
    formValue: {
      type: Object,
      default: () => ({}),
    },
    formConfig: {
      type: Object,
      deafult: () => ({}),
    },
    formRules: {
      type: Object,
      deafult: () => ({}),
    },
  },
  emits: ['update:formValue'],
  setup(props, { emit, expose }) {
    const innerForm = ref(props.formValue);
    const formItemRef = ref(null);

    watch(
      innerForm,
      () => {
        emit('update:formValue', innerForm.value);
      },
      { deep: true },
    );

    const validateAll = async () => {
      const resultList = [];

      for (const refEle of formItemRef.value) {
        const result = await refEle.validateFields('enforceValidate');

        resultList.push(result);
      }

      return !resultList.includes(false);
    };

    expose({ validateAll });

    return {
      innerForm,
      formItemRef,

    };
  },

});
</script>

<style lang="scss" scoped></style>
