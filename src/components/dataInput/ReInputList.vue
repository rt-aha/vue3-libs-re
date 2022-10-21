<template>
  <div class="re-input-list">
    <div class="re-input-list__add" @click="addNewItem">
      <span class="re-input-list__add__text">新增</span>
      <img class="re-input-list__add__icon" src="@/assets/icon/add.svg" @click="addNew">
    </div>

    <div class="re-input-wrap">
      <div v-for="v of innerValue" :key="v.id" class="re-input" :class="{ 're-input--disabled': disabled }">
        <div class="re-input__center">
          <div class="re-input__center__main">
            <input
              ref="inputField"
              class="re-input-native-field"
              :value="v.value"
              :disabled="v.disabled"
              v-bind="$attrs"
              @input="(e) => updateValue(e, v, 'input')"
              @change="(e) => updateValue(e, v, 'change')"
              @blur="(e) => updateValue(e, v, 'blur')"
              @keydown.enter="addNewItem"
            >
          </div>
          <div class="re-input__center__remove" @click="removeItem(v)">
            <img class="re-input__center__remove__icon" src="@/assets/icon/close.svg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue';
import useValidate from '@/hooks/useValidate';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
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
  prefix: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

const { validFn } = useValidate();
const innerValue = ref([]);
const inputField = ref(null);

const updateValue = (e, v, event) => {
  if (v.disabled) { return; }
  innerValue.value = innerValue.value.map((item) => {
    if (item.id === v.id) {
      item.value = e.target.value;
    }

    return item;
  });

  emit('update:modelValue', innerValue.value);
  validFn(event);
};

const autoFocusNext = () => {
  const lastIndex = inputField.value.length - 1;
  inputField.value[lastIndex].focus();
};

const addNewItem = async () => {
  const hasEmptyInput = innerValue.value.find(item => item.value === '');
  if (hasEmptyInput) { return; }

  innerValue.value.push({
    value: '',
    id: nanoid(),
  });
  emit('update:modelValue', innerValue.value);

  await nextTick();
  autoFocusNext();
};

const removeItem = (v) => {
  innerValue.value = innerValue.value.filter((item) => {
    console.log('...', item.id, v.id);
    return item.id !== v.id;
  });

  emit('update:modelValue', innerValue.value);
};

const init = () => {
  innerValue.value = props.modelValue;
};

init();

watch(() => props.modelValue, () => {
  init();
});
</script>

<style lang="scss" scoped>
.re-input-list {
  width: 100%;

  &__add {
    @include inline-flex();
    @include padding(5px 10px);
    cursor: pointer;
    background-color: $c-form-assist;
    border-radius: 4px;

    &__icon {
      width: 16px;
    }

    &__text {
      @include font-style($c-form-main, 14);
      margin-left: 5px;
    }
  }
}

.re-input-wrap {
  margin-top: 10px;
}

.re-input {
  @include padding(5px 0);
  @include flex();
  width: 100%;
  height: 36px;
  border: 1px solid $c-form-border;
  border-radius: 4px;

  & + & {
    margin-top: 10px;
  }

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
    position: relative;
    width: 100%;

    &__main {
      @include padding(0 8px);
      flex: 1;
    }

    &__remove {
      @include position(tr, 50%, 10px);
      @include flex(center);
      cursor: pointer;
      transform: translateY(-50%);

      &__icon {
        width: 20px;
      }
    }
  }
}

.re-input-native-field {
  @include form-font();
  width: 100%;
  background-color: transparent;
  border: 0;
  outline: 0;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none !important;
    margin: 0;
  }
}
</style>
