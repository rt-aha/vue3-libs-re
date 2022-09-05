<template>
  <div class="dev-modal-inner-modal">
    <ReEasyForm v-model:formValue="formValue" :formConfig="formValueConfig" :formRules="formRules" ref="formRef" />
    <div class="btn-wrap">
      <ReButton @click="handleForm">確認</ReButton>
      <ReButton @click="handleCancel">取消</ReButton>
    </div>
    <p class="mock-text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi aut, excepturi dignissimos laboriosam sunt,
      asperiores inventore soluta ea debitis vitae ullam, assumenda quis nulla sit! Obcaecati voluptatibus aperiam dolor
      ut laudantium error delectus a natus itaque eligendi sed, voluptatem quidem autem illo laborum alias. Soluta quo
      laboriosam atque animi nihil deleniti eaque, voluptatem inventore delectus non saepe cum suscipit, iste, eveniet
      incidunt expedita distinctio vitae quibusdam quam dolorem! Alias, officia accusamus distinctio iste, repudiandae
      suscipit debitis dignissimos cum, asperiores aliquid iure sapiente? Neque possimus est suscipit sapiente optio
      incidunt dolores nesciunt odio molestiae sunt recusandae, tempore doloremque ad. Animi dolore beatae, similique
      veniam mollitia consectetur pariatur in ex, dolor sed saepe, omnis quidem? Reprehenderit fugiat perferendis
      aliquam quas rerum nisi in architecto ducimus minima eos libero assumenda quia enim necessitatibus accusamus
      labore asperiores non temporibus, aliquid repellendus? At nihil eum eveniet ad facilis quis! Aspernatur
      voluptatibus repellat quam odit officia consequuntur, saepe earum impedit! Qui iure optio libero nostrum ab ea
      sunt numquam doloribus eligendi distinctio accusamus, quidem incidunt? Iusto officia excepturi ad dolores,
      voluptatem, veritatis autem totam nulla deserunt eveniet laborum ut commodi aut quo pariatur dolore corrupti
      distinctio ex nobis magnam ducimus rem modi eum velit? Similique odio, sunt saepe laboriosam nobis doloremque
      ipsum quas exercitationem repellat sed debitis autem eum perferendis consequuntur maiores rem recusandae itaque,
      fugit veritatis odit obcaecati. Rerum adipisci ducimus atque laborum laboriosam minima possimus ut unde
      consequatur officia illo ab aliquam voluptatibus dignissimos cumque impedit vero id obcaecati, ea iure libero
      natus eligendi. Quis corporis ipsam minima impedit eius magni hic repudiandae quas laboriosam aliquam illum
      ratione commodi, aliquid fuga maiores itaque labore ad molestiae, expedita mollitia similique soluta veniam! Alias
      voluptatum in ex molestias, laboriosam voluptatibus distinctio quas id quae minus pariatur dolores et officiis
      aut, delectus officia corrupti quos tempore explicabo!
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { vld } from '@/utils/validate/validator';
import ReEasyForm from '@/components/ReEasyForm.vue';
import ReButton from '@/components/ReButton.vue';
import useDrawer from '@/hooks/useDrawer';
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
    const { drawer } = useDrawer();
    const formRef = ref(null);

    const formValue = ref({
      input1: '',
      input2: '',
      input3: '',
    });

    const formValueConfig = [
      {
        compName: 'Input',
        formKey: 'input1',
        formItemLabel: '輸入1',
        value: formValue.value.newPassword,
      },
      {
        compName: 'Input',
        formKey: 'input2',
        formItemLabel: '輸入2',
        value: formValue.value.newPassword,
      },
      {
        compName: 'Input',
        formKey: 'input3',
        formItemLabel: '輸入3',
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
      const drawer1 = await drawer({
        width: '30vw',
        content: '這裡可以寫更多東西',
        data: {
          a: 1,
          b: 'str',
          c: true,
        },
      });

      console.log('drawer1', drawer1);
    };

    const handleCancel = async () => {
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
      handleCancel,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-wrap {
  margin-top: 20px;
  @include flex(center);
}

.mock-text {
  margin-top: 30px;
}
</style>
