<template>
  <div class="dev-modal-contnet">
    <ReEasyForm ref="formRef" v-model:formValue="formValue" :form-config="formValueConfig" :form-rules="formRules" />
    <div class="btn-wrap">
      <ReButton @click="getValue">
        getValue
      </ReButton>
      <ReButton @click="closeModal">
        關閉
      </ReButton>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { vld } from '@/utils/validate/validator';
import ReEasyForm from '@/components/dataInput/ReEasyForm.vue';
import ReButton from '@/components/common/ReButton.vue';

export default {
  name: 'DevModalContent',
  components: {
    ReEasyForm,
    ReButton,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const formRef = ref(null);

    const formValue = ref({
      newPassword: '',
      confirmPassword: '',
    });

    const formValueConfig = [
      {
        compName: 'Input',
        formKey: 'newPassword',
        formItemLabel: '新密碼',
        value: formValue.value.newPassword,
      },
      {
        compName: 'Input',
        formKey: 'confirmPassword',
        formItemLabel: '確認新密碼',
        value: formValue.value.confirmPassword,
      },
    ];

    const formRules = {
      newPassword: {
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
      confirmPassword: {
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
    };

    const getValue = () => {
      const validResult = formRef.value.validateAll();

      console.log('valid result...', validResult);
      console.log('formValue', formValue.value);
    };

    const closeModal = () => {
      emit('close', formValue.value);
    };

    return {
      formRef,
      formValue,
      formRules,
      formValueConfig,
      getValue,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-wrap {
  @include flex(center);
  margin-top: 20px;
}
</style>
