<template>
  <div class="re-search">
    <ReSearchWrap :formValue="innerForm" :formRules="formRules">
      <ReSearchGrid v-for="f of formConfig" :key="f.formKey" :layout="f.layout">
        <ReSearchItem :formKey="f.formKey" :label="f.formItemLabel" :hint="f.hint" ref="formItemRef">
          <component :is="`Re${f.compName}`" v-model="innerForm[f.formKey]" v-bind="f" />
        </ReSearchItem>
      </ReSearchGrid>
    </ReSearchWrap>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
import ReSearchWrap from '@/components/ReSearchWrap.vue';
import ReSearchItem from '@/components/ReSearchItem.vue';
import ReSearchGrid from '@/components/ReSearchGrid.vue';
import ReInput from '@/components/ReInput.vue';
import ReInputNumber from '@/components/ReInputNumber.vue';
import ReSelect from '@/components/ReSelect.vue';
import ReRadio from '@/components/ReRadio.vue';
import ReCheckbox from '@/components/ReCheckbox.vue';
import ReCheckboxGroup from '@/components/ReCheckboxGroup.vue';
import ReSwitch from '@/components/ReSwitch.vue';
import ReTimePicker from '@/components/ReTimePicker/index.vue';

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
<style lang="scss" scoped>
.re-search {
  width: 100%;
}
</style>
