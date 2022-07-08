<template>
  <div class="v-re-form">
    <!-- ReForm 施工中 ... -->
    <ContentLayout>
      <template v-slot:first>
        <ReForm :formValue="formValue" :formRules="formRules">
          <ReFormItem formKey="input" label="輸入框1">
            <ReInput v-model="formValue.input" />
          </ReFormItem>
          <ReFormItem formKey="input2" label="輸入框2">
            <ReInput v-model="formValue.input2" />
          </ReFormItem>
          <ReFormItem formKey="select1" label="下拉選單">
            <ReSelect v-model="formValue.select1" :optionConfig="selectOptions" />
          </ReFormItem>
        </ReForm>

      </template>
      <template v-slot:second>
        <ReEasyForm v-model:formValue="formValue2" :formConfig="formValue2Config" :formRules="formRules" />
        <ReButton @click="getValue">getValue</ReButton>
      </template>
    </ContentLayout>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import ReForm from '@/components/ReForm.vue'
import ReFormItem from '@/components/ReFormItem.vue'
import ReInput from '@/components/ReInput.vue'
import ReSelect from '@/components/ReSelect/index.vue'
import ReButton from '@/components/ReButton.vue'
import { selectOptions } from '@/config/mockOptions.js'
import ReEasyForm from '@/components/ReEasyForm.vue'

export default defineComponent({
  name: 'ViewReForm',
  components: {
    ReForm,
    ReFormItem,
    ReInput,
    ReSelect,
    ReButton,
    ReEasyForm,
  },
  setup() {
    const formValue = ref({
      input: '',
      input2: '',
      select1: 1
    })

    const formValue2 = ref({
      input: '',
      input2: '',
      select: 1
    })

    const formValue2Config = [
      {
        compName: 'Input',
        formKey: 'input',
        label: '輸入框1',
        value: formValue2.input
      },
      {
        compName: 'Input',
        formKey: 'input2',
        label: '輸入框2',
        value: formValue2.input2
      },
      {
        compName: 'Select',
        formKey: 'select',
        label: '下拉選單',
        value: formValue2.select,
        optionConfig: selectOptions
      }

    ]

    const formRules = {
      input: [
        {
          trigger: ['input'],
          message: '長度>=2',
          validator: (val) => {
            return val.length > 2
          }
        },
        {
          trigger: ['input', 'blur'],
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

    const getValue = () => {
      console.log('formValue2',formValue2.value)
    }

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
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
