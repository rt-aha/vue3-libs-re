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
        @input="handleInput"
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
  count: {
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

  if (value.length === props.count) {
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

const handleInput = async () => {
  handleChange();
  const nextIndex = innerValue.value.findIndex(item => item.value === '');

  if (nextIndex === -1) { return; }

  await nextTick(() => {
    autoInputRef.value[nextIndex].focus();
  });
};

const setValue = async () => {
  const val = [];

  for (let i = 0; i < Number(props.count); i += 1) {
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
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  width: 60px;
  height: 60px;
  border: 2px solid $c-deepblue;
  border-radius: 3px;

  & + & {
    margin-left: 10px;
  }

  &--size {
    &--small {
      width: 30px;
      height: 30px;
      border: 1px solid $c-deepblue;
    }

    &--large {
      width: 80px;
      height: 80px;
      border: 3px solid $c-deepblue;
    }
  }

  &__field {
    @include font-style($c-text1, 28px);
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 0 transparent;
    text-align: center;
    outline: 0 transparent;

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &--size {
      &--small {
        width: 20px;
        height: 20px;
        font-size: 16px;
      }

      &--large {
        width: 60px;
        height: 60px;
        font-size: 40px;
      }
    }
  }
}
</style>
