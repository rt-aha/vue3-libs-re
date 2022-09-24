<template>
  <div class="re-input" :class="{ 're-input--disabled': disabled }">
    <div class="re-input__center">
      <div class="re-input__center__prefix" v-if="slots.prefix">
        <slot name="prefix"></slot>
      </div>
      <div class="re-input__center__main">
        <input
          class="re-input-native-field"
          type="number"
          ref="inputField"
          @input="(e) => updateValue(e, 'input')"
          @change="(e) => updateValue(e, 'change')"
          @blur="(e) => updateValue(e, 'blur')"
          :value="modelValue"
          :disabled="disabled"
          inputmode="numeric"
        />
      </div>

      <div class="re-input__center__suffix" v-if="slots.suffix">
        <slot name="suffix"></slot>
      </div>
      <div class="re-input__center__control">
        <img class="re-input__center__control__icon" src="@/assets/icon/minus.svg" @click="minus" />
        <img class="re-input__center__control__icon" src="@/assets/icon/add.svg" @click="add" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import useValidate from '@/hooks/useValidate';

export default defineComponent({
  name: 'ReInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'input',
    },
    step: {
      type: [String, Number],
      default: 1,
    },
    max: {
      type: [String, Number, undefined],
      default: undefined,
    },
    min: {
      type: [String, Number, undefined],
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const { validFn } = useValidate();
    const inputType = ref('');
    // const validFn = getCurrentInstance().parent.ctx.validateFields;
    const inputField = ref(null);
    // const formRules = inject('formRules', {});

    const updateValue = (e, event) => {
      if (props.disabled) return;
      emit('update:modelValue', e.target.value);
      validFn(event);
    };

    const toggleEyeStatus = () => {
      if (props.disabled) return;
      inputType.value = inputType.value === 'password' ? 'text' : 'password';
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

    const add = () => {
      if (props.disabled) return;

      let val = Number(props.modelValue) + Number(props.step);
      if (props.max) {
        if (val > props.max) {
          val = props.max;
        }
      }

      emit('update:modelValue', val);
    };

    const minus = () => {
      if (props.disabled) return;
      let val = Number(props.modelValue) - Number(props.step);

      if (props.min) {
        if (val < props.min) {
          val = props.min;
        }
      }

      emit('update:modelValue', val);
    };

    const init = () => {
      if (!props.modelValue) {
        emit('update:modelValue', 0);
      }
    };

    onMounted(() => {
      setInitInputFieldValue();
    });

    init();

    return {
      inputField,
      updateValue,
      slots,
      toggleEyeStatus,
      inputType,
      add,
      minus,
      // handleInput,
      // handleChange,
      // handleBlur,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-input {
  width: 100%;
  height: 36px;
  border: 1px solid $c-form-border;
  @include padding(5px 0px);
  border-radius: 4px;
  @include flex();

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;

    .re-input-native-field,
    .re-input__center__control__icon {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__center {
    @include flex();
    width: 100%;

    &__prefix {
      flex: none;
      width: auto;
      @include padding(0 0 0 8px);
      @include form-font();
      @include flex(center);
    }

    &__main {
      flex: 1;
      @include padding(0px 8px);
    }

    &__suffix {
      flex: none;
      width: auto;
      @include padding(0 8px 0 0);
      @include form-font();
      @include flex(center);
    }

    &__control {
      flex: none;
      width: auto;
      @include padding(0px 8px);
      @include form-font();
      @include flex(center);
      position: relative;

      &::before {
        content: '';
        width: 1px;
        height: 14px;
        background-color: $c-form-border;
        display: inline-block;
        @include position(tl, 50%, 0);
        transform: translateY(-50%);
      }

      &__icon {
        width: 20px;
        cursor: pointer;
      }
    }
  }
}

.re-input-native-field {
  @include form-font();
  background-color: transparent;
  border: 0px;
  outline: 0px;
  width: 100%;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
}
</style>
