<template>
  <div class="re-easy-form">
    <ReForm :formValue="innerForm" :formRules="formRules">
      <ReFormItem
        :formKey="f.formKey"
        :label="f.formItemLabel"
        :hint="f.hint"
        v-for="f of formConfig"
        :key="f.formKey"
        ref="formItemRef"
      >
        <component
          :is="`Re${f.compName}`"
          v-model="innerForm[f.formKey]"
          v-model:extraValue="innerForm[f.extraFormKey]"
          v-bind="f"
        />
      </ReFormItem>
    </ReForm>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
import ReForm from '@/components/dataInput/ReForm.vue';
import ReFormItem from '@/components/dataInput/ReFormItem.vue';
import ReInput from '@/components/dataInput/ReInput.vue';
import ReInputNumber from '@/components/dataInput/ReInputNumber.vue';
import ReSelect from '@/components/dataInput/ReSelect.vue';
import ReRadio from '@/components/dataInput/ReRadio.vue';
import ReCheckbox from '@/components/dataInput/ReCheckbox.vue';
import ReCheckboxGroup from '@/components/dataInput/ReCheckboxGroup.vue';
import ReSwitch from '@/components/dataInput/ReSwitch.vue';
import ReTimePicker from '@/components/dataInput/timePicker/ReTimePickerIndex.vue';
import ReDependenceSelect from '@/components/dataInput/ReDependenceSelect.vue';
import ReMultiMultiCheckboxGroup from '@/components/dataInput/ReMultiMultiCheckboxGroup.vue';

export default defineComponent({
  name: 'ReEasyForm',
  components: {
    ReForm,
    ReFormItem,
    ReInput,
    ReInputNumber,
    ReSelect,
    ReRadio,
    ReCheckbox,
    ReSwitch,
    ReTimePicker,
    ReCheckboxGroup,
    ReDependenceSelect,
    ReMultiMultiCheckboxGroup,
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
  setup(props, { emit }) {
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
      let resultList = [];

      for (let refEle of formItemRef.value) {
        const result = await refEle.validateFields('enforceValidate');

        resultList.push(result);
      }

      return !resultList.some((val) => val === false);
    };

    return {
      innerForm,
      formItemRef,
      validateAll,
    };
  },
});
</script>
<style lang="scss" scoped></style>
