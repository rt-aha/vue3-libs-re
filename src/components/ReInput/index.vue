<template>
  <div class="re-input">
    <input
      class="re-input__field"
      type="text"
      ref="inputField"
      @input="handleInput"
    />
  </div>
</template>

<script>
  import { defineComponent, ref, onMounted } from 'vue';
  
export default defineComponent({
  name: 'ReReInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const inputField = ref(null);

    const handleInput = () => {
      emit('update:modelValue', inputField.value.value)
    }

    const setInitInputVieldValue = () => {
      inputField.value.value = props.modelValue
    }

    onMounted(() => {
      setInitInputVieldValue();
    })

    return {
      inputField,
      handleInput
    }
  }
});
</script>

<style lang="scss" scoped>
.re-input {
  background-color: #eee;
  display: inline-block;
  height: 36px;
    border-bottom: 1px solid $c-main;
    @include padding(5px 10px);
    

  &__field {
    background-color: transparent;
    border: 0px;
    outline: 0px;
    height: 100%;
  }
}
</style>
