<template>
  <div class="re-search">
    <ReSearchWrap :form-value="innerForm" :form-rules="formRules">
      <ReSearchGrid v-for="f of formConfig" :key="f.formKey" :layout="f.layout">
        <ReSearchItem ref="formItemRef" :form-key="f.formKey" :label="f.formItemLabel" :hint="f.hint">
          <component :is="`Re${f.compName}`" v-model="innerForm[f.formKey]" v-bind="f" />
        </ReSearchItem>
      </ReSearchGrid>
    </ReSearchWrap>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import ReSearchWrap from '@/components/dataInput/ReSearchWrap.vue';
import ReSearchItem from '@/components/dataInput/ReSearchItem.vue';
import ReSearchGrid from '@/components/dataInput/ReSearchGrid.vue';
import ReInput from '@/components/dataInput/ReInput.vue';
import ReInputNumber from '@/components/dataInput/ReInputNumber.vue';
import ReSelect from '@/components/dataInput/ReSelect.vue';
import ReRadio from '@/components/dataInput/ReRadio.vue';
import ReCheckbox from '@/components/dataInput/ReCheckbox.vue';
import ReCheckboxGroup from '@/components/dataInput/ReCheckboxGroup.vue';
import ReSwitch from '@/components/dataInput/ReSwitch.vue';
import ReTimePicker from '@/components/dataInput/ReTimePicker/index.vue';

export default defineComponent({
  name: 'ReSearch',
  components: {
    ReSearchWrap,
    ReSearchItem,
    ReInput,
    ReInputNumber,
    ReSelect,
    ReRadio,
    ReCheckbox,
    ReSwitch,
    ReTimePicker,
    ReCheckboxGroup,
    ReSearchGrid,
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

    const validateAll = () => {
      const resultList = [];

      formItemRef.value.forEach((refEle) => {
        const result = refEle.validateFields('enforceValidate');

        resultList.push(result);
      });

      return !resultList.includes(false);
    };

    return {
      innerForm,
      formItemRef,
      validateAll,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-search {
  width: 100%;
}
</style>
