<template>
  <div class="v-re-form">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReEasyForm v-model:formValue="formValue" :formConfig="formValueConfig" :formRules="formRules" ref="formRef" />
        <ReButton @click="getValue">getValue</ReButton>
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { vld } from '@/utils/validate/validator';
import ReButton from '@/components/ReButton.vue';
import { phoneOptions, phoneOptions2 } from '@/config/mockOptions.js';
import ReEasyForm from '@/components/ReEasyForm.vue';

export default defineComponent({
  name: 'ViewReForm',
  components: {
    ReButton,
    ReEasyForm,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    // props, { attrs }

    const formRef = ref(null);

    const formValue = ref({
      account: '',
      password: '',
      select: 1,
      radio1: 'apple',
      checkbox1: false,
      switch: false,
      timePicker: new Date(),
    });

    setTimeout(() => {
      // formValue.value.input = '111';
      // formValue.value.radio1 = 'banana';
    }, 1500);

    const formValueConfig = [
      {
        compName: 'Input',
        formKey: 'account',
        label: '帳號',
        value: formValue.value.input,
      },
      {
        compName: 'Input',
        formKey: 'password',
        label: '密碼',
        value: formValue.value.input2,
      },
      // {
      //   compName: 'Select',
      //   formKey: 'select',
      //   label: '下拉選單',
      //   value: formValue.value.select,
      //   options: phoneOptions,
      // },
      // {
      //   compName: 'Radio',
      //   formKey: 'radio1',
      //   label: '單選',
      //   value: formValue.value.radio1,
      //   options: phoneOptions,
      // },
      // {
      //   compName: 'Checkbox',
      //   formKey: 'checkbox1',
      //   label: '多選',
      //   value: formValue.value.checkbox1,
      //   options: phoneOptions,
      // },
      // {
      //   compName: 'Switch',
      //   formKey: 'switch',
      //   label: '是否',
      //   value: formValue.value.switch,
      // },
      // {
      //   compName: 'TimePicker',
      //   formKey: 'timePicker',
      //   label: '時間',
      //   value: formValue.value.timePicker,
      // },
    ];

    const formRules = {
      account: {
        trigger: ['input'],
        validator: ({ value, label }) => {
          console.log('value', value);
          return vld(value, {
            label,
            ruleList: [
              {
                name: 'vldRequired',
              },
              {
                // args: 規則名稱
                name: 'vldLengthMoreThen',
                // args: 定義參數
                args: {
                  min: 6,
                },
                // cusError: '定義名字'
              },
            ],
            options: {
              test: 'hi',
            },
            // 若另外設定，就走另外設定的
          });
        },
      },

      // input2: [
      //   {
      //     trigger: ['input'],
      //     message: '需為英文或數字',
      //     validator: (val) => {
      //       return regExp.alphebatOrNumeric.test(val);
      //     },
      //   },
      //   {
      //     trigger: ['input'],
      //     message: msgLengthMoreThen(6),
      //     validator: (val) => {
      //       console.log('val...', val);
      //       return vldLengthMoreThen(val, 6);
      //     },
      //   },
      // ],
      // checkbox1: [
      //   {
      //     trigger: ['change'],
      //     message: '長度>3',
      //     validator: (val) => {
      //       return val.length > 3;
      //     },
      //   },
      // ],
      // switch: [
      //   {
      //     trigger: ['change'],
      //     message: '必須為啟用',
      //     validator: (val) => {
      //       return val;
      //     },
      //   },
      // ],
    };

    const getValue = () => {
      const validResult = formRef.value.validateAll();

      console.log('valid result...', validResult);
      console.log('formValue', formValue.value);
    };

    // watch(() => formValue.value, () => {
    //   console.log('formValue',formValue.value)
    // })

    return {
      formRules,
      phoneOptions,
      formValue,
      formValueConfig,
      getValue,
      phoneOptions2,
      formRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.extra-page-title {
  @include font-style($c-main, 24, 500);
}
</style>
