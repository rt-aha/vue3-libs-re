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
        <component :is="`Re${f.compName}`" v-model="innerForm[f.formKey]" v-bind="f" />
      </ReFormItem>
    </ReForm>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
import ReForm from '@/components/ReForm.vue';
import ReFormItem from '@/components/ReFormItem.vue';
import ReInput from '@/components/ReInput.vue';
import ReInputNumber from '@/components/ReInputNumber.vue';
import ReSelect from '@/components/ReSelect.vue';
import ReRadio from '@/components/ReRadio.vue';
import ReCheckbox from '@/components/ReCheckbox.vue';
import ReCheckboxGroup from '@/components/ReCheckboxGroup.vue';
import ReSwitch from '@/components/ReSwitch.vue';
import ReTimePicker from '@/components/ReTimePicker/index.vue';

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
  emit: ['update:formValue'],
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

    const validateAll = () => {
      let resultList = [];

      formItemRef.value.forEach((refEle) => {
        const result = refEle.validateFields('enforceValidate');

        resultList.push(result);
      });

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
