<template>
  <div class="re-input" :class="{ 're-input--disabled': disabled }">
    <div v-if="slots.left" class="re-input__left">
      <slot name="left" />
    </div>
    <div class="re-input__center">
      <div v-if="slots.prefix" class="re-input__center__prefix">
        <slot name="prefix" />
      </div>

      <div class="re-input__center__main">
        <input
          ref="inputRef"
          class="re-input-native-field"
          :type="inputType"
          :value="modelValue"
          :disabled="disabled"
          v-bind="$attrs"
          @input="(e) => updateValue(e, 'input')"
          @change="(e) => updateValue(e, 'change')"
          @blur="(e) => updateValue(e, 'blur')"
          @keydown.enter="(e) => updateValue(e, 'keydown.enter')"
        >
      </div>
      <div v-if="type === 'password'" class="re-input__center__eye" @click="toggleEyeStatus">
        <img
          v-show="inputType === 'text'"
          class="re-input__center__eye__icon re-input__center__eye__icon--show"
          src="@/assets/icon/eye-show.svg"
        >
        <img
          v-show="inputType === 'password'"
          class="re-input__center__eye__icon re-input__center__eye__icon--hide"
          src="@/assets/icon/eye-hide.svg"
        >
      </div>
      <div v-if="slots.suffix" class="re-input__center__suffix">
        <slot name="suffix" />
      </div>
    </div>
    <div v-if="slots.right" class="re-input__right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
import useValidate from '@/hooks/useValidate';

const props = defineProps({
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
});
const emit = defineEmits(['update:modelValue', 'onChange']);
const slots = useSlots();

const { validFn } = useValidate();
const inputType = ref('');
const inputRef = ref(null);

const updateValue = (e, event) => {
  if (props.disabled) { return; }
  emit('update:modelValue', e.target.value);
  emit('onChange', e.target.value, event);

  validFn(event);
};

const toggleEyeStatus = () => {
  if (props.disabled) { return; }
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
};

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
</script>

<style lang="scss" scoped>
.re-input {
  @include padding(5px 0);
  @include flex();
  width: 100%;
  height: 36px;
  border: 1px solid $c-form-assist;
  border-radius: 4px;

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
    position: relative;
    flex: none;
    width: auto;
    @include padding(0 8px);
    @include form-font();

    &::after {
      display: inline-block;
      width: 1px;
      height: 14px;
      content: "";
      background-color: $c-form-border;
      transform: translateY(-50%);
      @include position(tr, 50%, 0);
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
      @include padding(0 8px);
    }

    &__eye {
      flex: none;
      width: auto;
      @include padding(0 8px);
      @include form-font();
      @include flex(center);

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
    position: relative;
    flex: none;
    width: auto;
    @include padding(0 8px);
    @include form-font();

    &::before {
      display: inline-block;
      width: 1px;
      height: 14px;
      content: "";
      background-color: $c-form-border;
      transform: translateY(-50%);
      @include position(tl, 50%, 0);
    }
  }
}

.re-input-native-field {
  @include form-font();
  width: 100%;
  background-color: transparent;
  border: 0;
  outline: 0;
}
</style>
