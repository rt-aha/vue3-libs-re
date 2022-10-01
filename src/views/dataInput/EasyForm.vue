<template>
  <div class="v-re-form">
    <dev-section title="有依賴關係的">
      <div class="wrap">
        <ReEasyForm
          v-model:formValue="dependencyForm"
          :formConfig="dependencyFormConfig"
          :formRules="dependencyFormRule"
          ref="dependencyFormRef"
        />
        <ReButton @click="dependencyFormSubmit"> dependency form</ReButton>
      </div>
    </dev-section>

    <dev-section title="基本使用">
      <div class="wrap">
        <ReEasyForm
          v-model:formValue="basicForm"
          :formConfig="basicFormConfig"
          :formRules="basicFormRule"
          ref="basicFormRef"
        />
        <ReButton @click="basicFormSubmit"> basic form</ReButton>
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ReButton from '@/components/common/ReButton.vue';
import ReEasyForm from '@/components/dataInput/ReEasyForm.vue';
import { basicFormRule, dependencyFormRule } from '@/config/formRules';
import { basicFormConfig, dependencyFormConfig } from '@/config/formConfigs';

const basicFormRef = ref(null);
const dependencyFormRef = ref(null);

const basicForm = ref({
  city: '',
  region: '',
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
});

const basicFormSubmit = () => {
  const validResult = basicFormRef.value.validateAll();
  console.log('basicForm--result', validResult, basicForm.value);
};

const dependencyFormSubmit = () => {
  const validResult = dependencyFormRef.value.validateAll();
  console.log('dependencyForm--result', validResult, dependencyForm.value);
};
</script>

<style lang="scss" scoped>
.extra-page-title {
  @include font-style($c-main, 24, 500);
}
</style>
