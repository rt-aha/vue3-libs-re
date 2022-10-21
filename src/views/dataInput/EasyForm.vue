<template>
  <div class="v-re-form">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReButton @click="basicFormSubmit">
          basic form
        </ReButton>
        <ReEasyForm
          ref="basicFormRef"
          v-model:formValue="basicForm"
          :form-config="basicFormConfig"
          :form-rules="basicFormRule"
        />
        <ReButton @click="basicFormSubmit">
          basic form
        </ReButton>
      </div>
    </dev-section>

    <dev-section title="有依賴關係的">
      <div class="wrap">
        <ReEasyForm
          ref="dependencyFormRef"
          v-model:formValue="dependencyForm"
          :form-config="dependencyFormConfig"
          :form-rules="dependencyFormRule"
        />
        <ReButton @click="dependencyFormSubmit">
          dependency form
        </ReButton>
      </div>
    </dev-section>

    <dev-section title="多對多">
      <div class="wrap">
        <ReEasyForm
          ref="dependencyFormRef"
          v-model:formValue="multiMultiForm"
          :form-config="multiMultiFormConfig"
          :form-rules="multiMultiFormRule"
        />
        <ReButton @click="multiMultiFormSubmit">
          multiMulti form
        </ReButton>
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ReButton from '@/components/common/ReButton.vue';
import ReEasyForm from '@/components/dataInput/ReEasyForm.vue';
import { basicFormRule, dependencyFormRule, multiMultiFormRule } from '@/config/formRules';
import { basicFormConfig, dependencyFormConfig, multiMultiFormConfig } from '@/config/formConfigs';

const basicFormRef = ref(null);
const dependencyFormRef = ref(null);
const multiMultiFormRef = ref(null);

const multiMultiForm = ref({
  mulltiCities: {},
});

const basicForm = ref({
  // input
  inputVal: '',
  inputValDisabled: '',
  inputValPassword: '',
  // inputNumber
  inputNumberVal: 0,
  inputNumberValDisabled: 0,
  inputNumberValStep: 0,
  inputNumberMinMax: 0,
  inputNumberStepMinMax: 0,
  // select
  selectVal: '',
  selectDisabled: '',
  selectValMultiple: [],
  // radio
  radioVal: '',
  radioValDisabled: '',
  // checkbox
  checkboxVal: false,
  checkboxValDisabled: '',
  // checkboxGroup
  checkboxGroupVal: [],
  checkboxGroupValDisabled: [],
  // switch
  switchVal: false,
  switchValDisabled: false,
  // textarea
  textareaVal: '',
  textareaValDisabled: '',
  // timePicker
  timePickerVal: new Date(),
  // datePicker
  datePickerVal: new Date(),
  // inputList
  inputListVal: [],
  // city: '',
  // region: '',
  // slider: 32,
});

const dependencyForm = ref({
  account: '',
  password: '',
  gender: 0,
  income: 0,
  agree: false,
  occupation: [],
  enable: false,
  height: 0,
  timePicker: new Date(),
  mdEditor: '',
});

setTimeout(() => {
  const d = new Date();
  const testDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 2);

  basicForm.value.inputVal = 'after3000ms';
  basicForm.value.inputNumberVal = 30;
  basicForm.value.selectVal = 'female';
  basicForm.value.selectValMultiple = [100, 207];
  basicForm.value.radioVal = 'female';
  basicForm.value.checkboxVal = true;
  basicForm.value.checkboxGroupVal = ['retire'];
  basicForm.value.switchVal = true;
  basicForm.value.textareaVal = 'after3000ms';
  basicForm.value.timePickerVal = new Date();
  basicForm.value.datePickerVal = testDate;
  basicForm.value.inputListVal = [
    {
      value: '11',
      id: '11',
    },
    {
      value: '22',
      id: '22',
    },
  ];
}, 3000);

const basicFormSubmit = async () => {
  const validResult = await basicFormRef.value.validateAll();
  console.log('basicForm--result', validResult, basicForm.value);
};

const dependencyFormSubmit = () => {
  const validResult = dependencyFormRef.value.validateAll();
  console.log('dependencyForm--result', validResult, dependencyForm.value);
};

const multiMultiFormSubmit = () => {
  const validResult = multiMultiFormRef.value.validateAll();
  console.log('dependencyForm--result', validResult, multiMultiForm.value);
};
</script>

<style lang="scss" scoped>
.extra-page-title {
  @include font-style($c-deepblue, 24, 500);
}
</style>
