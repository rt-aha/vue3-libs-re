<template>
  <div class="v-re-form">
    <!-- ReForm 施工中 ... -->
    <ReForm :formValue="formValue" :formRules="formRules">
      <ReFormItem formKey="input">
        <ReInput v-model="formValue.input"/>
      </ReFormItem>
      <ReFormItem formKey="input2">
        <ReInput v-model="formValue.input2"/>
      </ReFormItem>
    </ReForm>
  </div>
</template>

<script>
import { defineComponent,ref } from 'vue';
import ReForm from '@/components/ReForm/index.vue'
import ReFormItem from '@/components/ReFormItem/index.vue'
import ReInput from '@/components/ReInput/index.vue'

export default defineComponent({
  name: 'ViewReForm',
  components: {
    ReForm,
    ReFormItem,
    ReInput
  },
  setup() {
    const formValue = ref({
      input: '',
      input2: '',
    })

    const formRules = {
      input: [
        {
          message: '長度>=2',
          validator: (val) => {
            return val.length > 2
          }
        },
        {
          message: '長度>=4',
          validator: (val) => {
            return val.length > 4
          }
        }
      ],
      input2: [
        {
          message: '長度>=3',
          validator: (val) => {
            return val.length > 3
          }
        },
        {
          message: '長度>=5',
          validator: (val) => {
            return val.length > 5
          }
        }
      ]
    }

    return {
      formValue,
      formRules

    }
  }
});
</script>

<style lang="scss" scoped>
</style>
