<template>
  <div class="dev-modal-inner-modal">
    <ReEasyForm ref="formRef" v-model:formValue="formValue" :form-config="formValueConfig" :form-rules="formRules" />
    <div class="btn-wrap">
      <ReButton @click="handleForm">
        確認
      </ReButton>
      <ReButton @click="cancel">
        取消
      </ReButton>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { vld } from '@/utils/validate/validator';
import ReEasyForm from '@/components/dataInput/ReEasyForm.vue';
import ReButton from '@/components/common/ReButton.vue';
import useModal from '@/hooks/useModal';

export default {
  name: 'DevModalContent',
  components: {
    ReEasyForm,
    ReButton,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const { modal } = useModal();
    const formRef = ref(null);

    const formValue = ref({
      remark: '',
    });

    const formValueConfig = [
      {
        compName: 'Input',
        formKey: 'remark',
        formItemLabel: '備註',
        value: formValue.value.newPassword,
      },
    ];

    const formRules = {
      remark: {
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

    const cancel = () => {
      emit('close');
    };

    const submit = () => {
      const validResult = formRef.value.validateAll();
      console.log('valid result...', validResult);
      // cancel();
    };

    const handleForm = async () => {
      await modal({
        content: '確定刪除',
        btns: [
          {
            label: '確認',
            cb: () => {
              submit();
              emit('close');
            },
          },
        ],
      });
    };

    return {
      formRef,
      formValue,
      formRules,
      formValueConfig,
      submit,
      cancel,
      handleForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-wrap {
  margin-top: 20px;
  @include flex(center);
}
</style>
