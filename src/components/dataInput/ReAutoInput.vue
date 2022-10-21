<template>
  <div class="re-auto-input">
    <div v-for="(n, idx) of innerValue" :key="idx" class="input-field-box" :class="[`input-field-box--size--${size}`]">
      <input
        ref="autoInputRef"
        v-model="n.value"
        class="input-field-box__field"
        :class="[`input-field-box__field--size--${size}`]"
        inputmode="numeric"
        min="0"
        max="9"
        maxlength="1"
        type="number"
        @input="(e) => handleInput(e, idx)"
        @keydown="(e) => handleKeydown(e, idx)"
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  amount: {
    type: [String, Number],
    default: 6,
  },
  size: {
    type: String,
    default: 'default',
    validator: val => ['small', 'default', 'large'].includes(val),
  },
});
const emit = defineEmits(['onChange', 'onCompleted']);

const innerValue = ref([]);
const autoInputRef = ref(null);

const handleChange = () => {
  const value = innerValue.value.map(item => item.value).join('');
  emit('onChange', value);

  if (value.length === Number(props.amount)) {
    emit('onCompleted', value);
  }
};

const handleKeydown = async (e, refIndex) => {
  if (e.keyCode === 8) {
    const prevIndex = refIndex - 1;
    const emptyInput = innerValue.value.find(item => item.value === '');

    // 表示現在全部輸入框都有數字，刪除現有輸入框數字
    if (!emptyInput) {
      innerValue.value = innerValue.value.map((item, index) => {
        if (item.refIndex === refIndex) {
          item.value = '';
        }

        return item;
      });
    }
    else {
      // 刪除前一個輸入框數字，並移動關注點到前一個
      innerValue.value = innerValue.value.map((item) => {
        if (item.refIndex === prevIndex) {
          item.value = '';
        }

        return item;
      });

      await nextTick(() => {
        if (prevIndex !== -1) {
          autoInputRef.value[prevIndex].focus();
        }
      });
    }

    handleChange();
  }
};

const handleInput = async (e, refIndex) => {
  if (refIndex === Number(props.amount - 1) && String(innerValue.value[refIndex].value)) {
    const latestVal = innerValue.value[refIndex];
    latestVal.value = Number(String(latestVal.value).substring(0, 1));

    innerValue.value.splice(refIndex, 1, latestVal);
  }

  handleChange();
  const nextIndex = innerValue.value.findIndex(item => item.value === '');

  if (nextIndex === -1) { return; }

  await nextTick(() => {
    autoInputRef.value[nextIndex].focus();
  });
};

const setValue = async () => {
  const val = [];

  for (let i = 0; i < Number(props.amount); i += 1) {
    val.push('');
  }

  innerValue.value = val.map((n, index) => ({
    value: '',
    refIndex: index,
  }));

  await nextTick(() => {
    autoInputRef.value[0].focus();
  });
};

setValue();
</script>

<style lang="scss" scoped>
.input-field-box {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: 2px solid $c-form-assist;
  border-radius: 3px;

  & + & {
    margin-left: 10px;
  }

  &--size {
    &--small {
      width: 30px;
      height: 30px;
      border: 1px solid $c-form-assist;
    }

    &--large {
      width: 80px;
      height: 80px;
      border: 3px solid $c-form-assist;
    }
  }

  &__field {
    @include font-style($c-form-main, 28);
    display: inline-block;
    width: 40px;
    height: 40px;
    text-align: center;
    border: 0 transparent;
    outline: 0 transparent;

    &::-webkit-inner-spin-button {
      appearance: none;
    }

    &--size {
      &--small {
        @include font-size(16);
        width: 20px;
        height: 20px;
        font-size: 16px;
      }

      &--large {
        @include font-size(40);
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
