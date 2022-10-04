<template>
  <div class="re-input" :class="{ 're-input--disabled': disabled }">
    <div class="re-input__left" v-if="slots.left">
      <slot name="left"></slot>
    </div>
    <div class="re-input__center">
      <div class="re-input__center__prefix" v-if="slots.prefix">
        <slot name="prefix"></slot>
      </div>

      <div class="re-input__center__main">
        <input
          class="re-input-native-field"
          :type="inputType"
          ref="inputRef"
          @input="(e) => updateValue(e, 'input')"
          @change="(e) => updateValue(e, 'change')"
          @blur="(e) => updateValue(e, 'blur')"
          @keydown.enter="(e) => updateValue(e, 'keydown.enter')"
          :value="modelValue"
          :disabled="disabled"
        />
      </div>
      <div class="re-input__center__eye" @click="toggleEyeStatus" v-if="type === 'password'">
        <img
          class="re-input__center__eye__icon re-input__center__eye__icon--show"
          src="@/assets/icon/eye-show.svg"
          v-show="inputType === 'text'"
        />
        <img
          class="re-input__center__eye__icon re-input__center__eye__icon--hide"
          src="@/assets/icon/eye-hide.svg"
          v-show="inputType === 'password'"
        />
      </div>
      <div class="re-input__center__suffix" v-if="slots.suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
    <div class="re-input__right" v-if="slots.right">
      <slot name="right"></slot>
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
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'input',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'onChange'],
  setup(props, { emit, slots }) {
    const { validFn } = useValidate();
    const inputType = ref('');
    // const validFn = getCurrentInstance().parent.ctx.validateFields;
    const inputRef = ref(null);
    // const formRules = inject('formRules', {});

    const updateValue = (e, event) => {
      if (props.disabled) return;
      emit('update:modelValue', e.target.value);
      emit('onChange', e.target.value, event);

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
      inputRef.value.value = props.modelValue;
    };

    const init = () => {
      inputType.value = props.type || 'input';
    };

    onMounted(() => {
      setInitInputFieldValue();
    });

    init();

    return {
      inputRef,
      updateValue,
      slots,
      toggleEyeStatus,
      inputType,
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
    .re-input__center__eye__icon {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__left {
    flex: none;
    width: auto;
    @include padding(0 8px);
    @include form-font();
    position: relative;

    &::after {
      content: '';
      width: 1px;
      height: 14px;
      background-color: $c-form-border;
      display: inline-block;
      @include position(tr, 50%, 0);
      transform: translateY(-50%);
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

    &__eye {
      flex: none;
      width: auto;
      @include padding(0px 8px);
      @include form-font();
      @include flex(center);
      /* position: relative;

      &::before {
        content: '';
        width: 1px;
        height: 14px;
        background-color: $c-form-border;
        display: inline-block;
        @include position(tl, 50%, 0);
        transform: translateY(-50%);
      } */

      &__icon {
        width: 20px;
        cursor: pointer;
      }
    }

    &__suffix {
      flex: none;
      width: auto;
      @include padding(0 8px 0 0);
      @include form-font();
      @include flex(center);
    }
  }
  &__right {
    flex: none;
    width: auto;
    @include padding(0 8px);
    @include form-font();
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
  }
}

.re-input-native-field {
  @include form-font();
  background-color: transparent;
  border: 0px;
  outline: 0px;
  width: 100%;
}
</style>
