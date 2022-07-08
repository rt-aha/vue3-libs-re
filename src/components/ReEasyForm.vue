<template>
  <div class="re-easy-form">
    <ReForm :formValue="innerForm" :formRules="formRules">
      <ReFormItem :formKey="f.formKey" :label="f.label" v-for="f of formConfig" :key="f.formKey">
        <component :is="`Re${f.compName}`" v-model="innerForm[f.formKey]" v-bind="f"/>
        <!-- <component :is="`Re${f.compName}`" v-model="f.value" v-bind="f"/> -->
      </ReFormItem>
    </ReForm>
  </div>
</template>
<script>
import { defineComponent, ref,watch } from 'vue';
import ReForm from '@/components/ReForm.vue'
import ReFormItem from '@/components/ReFormItem.vue'
import ReInput from '@/components/ReInput.vue'
import ReSelect from '@/components/ReSelect/index.vue'

export default defineComponent({
  name: 'ReEasyForm',
  components: {
    ReForm,
    ReFormItem,
    ReInput,
    ReSelect,
  },
  props: {
    formValue: {
      type: Object,
      default: () => ({})
    },
    formConfig: {
      type: Object,
      deafult: () => ({})
    },
    formRules: {
      type: Object,
      deafult: () => ({})
    }
  },
  emit: ['update:formValue'],
  setup(props, {emit}) {
    const innerForm = ref(props.formValue);

    watch(innerForm, () => {
      emit('update:formValue', innerForm.value);
    }, {deep: true})


    return {
      innerForm
    }
  }
});
</script>
<style lang="scss" scoped>

</style>
