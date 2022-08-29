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
import { phoneOptions, phoneOptions2, genderOptions, incomeOptions, hobbyOptions } from '@/config/mockOptions.js';
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
      gender: 0,
      income: 0,
      agree: false,
      hobby: [],
      enable: false,
      height: 0,
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
        formItemLabel: '帳號',
        value: formValue.value.account,
      },
      {
        compName: 'Input',
        formKey: 'password',
        formItemLabel: '密碼',
        value: formValue.value.password,
      },
      {
        compName: 'Select',
        formKey: 'gender',
        formItemLabel: '性別',
        value: formValue.value.gender,
        options: genderOptions,
      },
      {
        compName: 'Radio',
        formKey: 'income',
        formItemLabel: '收入',
        value: formValue.value.income,
        options: incomeOptions,
      },
      {
        compName: 'Checkbox',
        formKey: 'agree',
        formItemLabel: '同意書',
        label: '我同意',
        value: formValue.value.agree,
      },
      {
        compName: 'CheckboxGroup',
        formKey: 'hobby',
        formItemLabel: '興趣',
        value: formValue.value.hobby,
        options: hobbyOptions,
      },
      {
        compName: 'Switch',
        formKey: 'enable',
        formItemLabel: '啟用',
        value: formValue.value.enable,
      },
      {
        compName: 'InputNumber',
        formKey: 'height',
        formItemLabel: '身高',
        value: formValue.value.height,
      },
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
          return vld(value, {
            label,
            ruleList: [
              // 基本使用
              {
                name: 'vldRequired',
              },
              // 帶參數
              {
                // name: 規則名稱
                name: 'vldLengthMoreThen',
                // args: 定義參數
                args: {
                  min: 6,
                },
              },
              // 自訂錯誤訊息
              {
                name: 'vldEnglish',
                // cusError: 自定義名字錯誤訊息名稱(寫在 errorMessage 中)
                cusError: 'cusVldEnglish',
              },
              // 非同步
              {
                name: 'vldAsyncFn',
              },
            ],
            options: {
              test: 'hi',
            },
            // 若另外設定，就走另外設定的
          });
        },
      },
      password: {
        trigger: ['input'],
        validator: ({ value, label }) => {
          return vld(value, {
            label,
            ruleList: [
              {
                name: 'vldRequired',
                cusError: 'vldRequiredWithLabel',
              },
            ],
          });
        },
      },
      gender: {
        trigger: ['change'],
        validator: ({ value, label }) => {
          return vld(value, {
            label,
            ruleList: [
              {
                name: 'vldSelect',
                cusError: 'vldSelectWithLabel',
              },
            ],
          });
        },
      },
      income: {
        trigger: ['change'],
        validator: ({ value, label }) => {
          return vld(value, {
            label,
            ruleList: [
              {
                name: 'vldSelect',
              },
            ],
          });
        },
      },
      hobby: {
        trigger: ['change'],
        validator: ({ value, label }) => {
          return vld(value, {
            label,
            ruleList: [
              {
                name: 'vldCheckMultiple',
                args: {
                  min: 1,
                },
              },
            ],
          });
        },
      },
      agree: {
        trigger: ['change'],
        validator: ({ value, label }) => {
          return vld(value, {
            label,
            ruleList: [
              {
                name: 'vldCheck',
              },
            ],
          });
        },
      },
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
