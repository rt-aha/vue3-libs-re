<template>
  <div class="re-input">
    <input
      class="re-input__field"
      type="text"
      ref="inputField"
      @input="(e) => updateValue(e, 'input')"
      @change="(e) => updateValue(e, 'change')"
      @blur="(e) => updateValue(e, 'blur')"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';

export default defineComponent({
  name: 'ReInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const validFn = getCurrentInstance().parent.ctx.validateFields;
    const inputField = ref(null);
    // const formRules = inject('formRules', {});

    const updateValue = (e, event) => {
      emit('update:modelValue', e.target.value);
      // console.log('event',event)
      validFn(event);
    };

    // const handleInput = () => {
    //   updateValue();
    // }

    // const handleChange = () => {
    //   updateValue();
    //   validFn('change')
    // }
    // const handleBlur = () => {
    //   updateValue();
    //   validFn('blur')
    // }

    const setInitInputFieldValue = () => {
      inputField.value.value = props.modelValue;
    };

    onMounted(() => {
      setInitInputFieldValue();
    });

    return {
      inputField,
      updateValue,
      // handleInput,
      // handleChange,
      // handleBlur,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-input {
  background-color: #eee;
  display: inline-block;
  height: 36px;
  border-bottom: 1px solid $c-main;
  @include padding(5px 10px);
  // width: 200px;
  @include flex();
  box-shadow: 0 0 10px 3px $c-shadow;

  &__field {
    @include font-style($c-black, 14, 400, 1px 14px);
    background-color: transparent;
    border: 0px;
    outline: 0px;
  }
}
</style>
