<template>
  <div class="v-manage-page">
    <ReSearch v-model:formValue="formValue" :formConfig="searchConfig" ref="searchRef" />
    <ReButton @click="getValue">getValue</ReButton>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { genderOptions, hobbyOptions } from '@/config/mockOptions.js';
import ReButton from '@/components/ReButton.vue';
import ReSearch from '@/components/ReSearch.vue';

export default defineComponent({
  name: 'ViewManagePage',
  components: {
    ReSearch,
    ReButton,
  },
  setup() {
    const formValue = ref({
      keyword: '',
      hobby: [],
      gender: 0,
      agree: false,
      enable: false,
      height: 0,
    });

    const searchConfig = [
      {
        compName: 'Input',
        formKey: 'keyword',
        formItemLabel: '關鍵字',
        value: formValue.value.keyword,
        // 768 以下預設 24
        layout: {
          768: 12,
          1024: 8,
          1440: 6,
        },
      },
      {
        compName: 'Select',
        formKey: 'hobby',
        formItemLabel: '興趣',
        value: formValue.value.hobby,
        multiple: true,
        options: hobbyOptions,
        layout: {
          768: 12,
          1024: 8,
          1440: 6,
        },
      },
      {
        compName: 'Radio',
        formKey: 'gender',
        formItemLabel: '性別',
        value: formValue.value.gender,
        multiple: true,
        options: genderOptions,
        layout: {
          768: 6,
        },
      },
      {
        compName: 'Checkbox',
        formKey: 'agree',
        formItemLabel: '同意書',
        label: '我同意',
        value: formValue.value.agree,
        layout: {
          768: 6,
        },
      },
      {
        compName: 'Switch',
        formKey: 'enable',
        formItemLabel: '啟用',
        value: formValue.value.enable,
        layout: {
          768: 6,
        },
      },
      {
        compName: 'InputNumber',
        formKey: 'height',
        formItemLabel: '身高',
        value: formValue.value.height,
        layout: {
          768: 6,
        },
      },
    ];

    const getValue = () => {
      console.log('formValue', formValue.value);
    };

    return {
      searchConfig,
      formValue,
      getValue,
    };
  },
});
</script>

<style lang="scss" scoped></style>
