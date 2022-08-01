<template>
  <div class="v-re-form">
    <!-- ReForm 施工中 ... -->
    <ContentLayout>
      <template v-slot:first>
        <ReEasyForm
          v-model:formValue="formValue2"
          :formConfig="formValue2Config"
          :formRules="formRules"
          ref="formRef"
        />
        <ReButton @click="getValue">getValue</ReButton>
      </template>
      <template v-slot:second> </template>
    </ContentLayout>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

import ReButton from '@/components/ReButton.vue';
import { selectOptions, fruitDataOptions } from '@/config/mockOptions.js';
import ReEasyForm from '@/components/ReEasyForm.vue';

export default defineComponent({
  name: 'ViewReForm',
  components: {
    ReButton,
    ReEasyForm,
  },
  setup() {
    const formRef = ref(null);
    const formValue = ref({
      input: '',
      input2: '',
      select1: 1,
      radio1: 'apple',
    });

    const formValue2 = ref({
      input: '222',
      input2: '',
      select: 1,
      radio1: 'apple',
      checkbox1: ['apple', 'banana'],
      switch: false,
    });

    setTimeout(() => {
      // formValue2.value.input = '111';
      // formValue2.value.radio1 = 'banana';
    }, 1500);

    const formValue2Config = [
      {
        compName: 'Input',
        formKey: 'input',
        label: '輸入框1',
        value: formValue2.value.input,
      },
      {
        compName: 'Input',
        formKey: 'input2',
        label: '輸入框2',
        value: formValue2.value.input2,
      },
      {
        compName: 'Select',
        formKey: 'select',
        label: '下拉選單',
        value: formValue2.value.select,
        optionConfig: selectOptions,
      },
      {
        compName: 'Radio',
        formKey: 'radio1',
        label: '單選',
        value: formValue2.value.radio1,
        optionConfig: fruitDataOptions,
      },
      {
        compName: 'Checkbox',
        formKey: 'checkbox1',
        label: '多選',
        value: formValue2.value.checkbox1,
        optionConfig: fruitDataOptions,
      },
      {
        compName: 'Switch',
        formKey: 'switch',
        label: '是否',
        value: formValue2.value.switch,
      },
    ];

    const formRules = {
      input: [
        {
          trigger: ['input'],
          message: '長度>=2',
          validator: (val) => {
            return val.length > 2;
          },
        },
        {
          trigger: ['input', 'blur'],
          message: '長度>=4',
          validator: (val) => {
            return val.length > 4;
          },
        },
      ],
      input2: [
        {
          message: '長度>=3',
          validator: (val) => {
            return val.length > 3;
          },
        },
        {
          message: '長度>=5',
          validator: (val) => {
            return val.length > 5;
          },
        },
      ],
      checkbox1: [
        {
          trigger: ['change'],
          message: '長度>3',
          validator: (val) => {
            return val.length > 3;
          },
        },
      ],
      switch: [
        {
          trigger: ['change'],
          message: '必須為啟用',
          validator: (val) => {
            return val;
          },
        },
      ],
    };

    const getValue = () => {
      const validResult = formRef.value.validateAll();

      console.log('validResult', validResult);
      console.log('formValue2', formValue2.value);
    };

    // watch(() => formValue2.value, () => {
    //   console.log('formValue2',formValue2.value)
    // })

    return {
      formValue,
      formRules,
      selectOptions,
      formValue2,
      formValue2Config,
      getValue,
      fruitDataOptions,
      formRef,
    };
  },
});
</script>

<style lang="scss" scoped></style>
