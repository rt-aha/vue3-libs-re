<template>
  <div class="re-textarea">
    <textarea
      v-bind="$attrs"
      ref="textareaRef"
      :style="cssStyle"
      class="re-textarea__native"
      :class="[
        {
          're-textarea__native--autosize--none': autosize === 'none',
          're-textarea__native--autosize--vertical': autosize === 'vertical',
          're-textarea__native--autosize--horizontal': autosize === 'horizontal',
          're-textarea__native--disabled': disabled,
        },
      ]"
      :rows="textAreaRows"
      :value="modelValue"
      @input="(e) => updateValue(e, 'input')"
      @change="(e) => updateValue(e, 'change')"
      @blur="(e) => updateValue(e, 'blur')"
    />
    <div
      v-if="textLimit !== ''"
      class="count-limit"
      :class="[
        {
          'count-limit--warning': isOverTextLimit,
        },
      ]"
    >
      <span class="count-limit__curr-text-count">{{ currTextCount }}</span>
      <span class="count-limit__slash">/</span>
      <span class="count-limit__limit-text">{{ textLimit }}字</span>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
import { isNumber } from 'lodash-es';
import useValidate from '@/hooks/useValidate';

export default defineComponent({
  name: 'ReTextarea',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    autosize: {
      type: [Boolean, String],
      default: false,
      validator: val => ['none', 'vertical', 'horizontal', true, false].includes(val),
    },
    rows: {
      type: [String, Number],
      default: '3',
    },
    width: {
      type: [Number, String],
      default: '100%',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    textLimit: {
      type: [String, Number],
      default: '',
      validator: val => isNumber(Number(val)),
    },
  },
  setup(props, { emit }) {
    const { validFn } = useValidate();

    const textareaRef = ref(null);

    const nativeTextareaValue = computed(() => {
      if (!props.modelValue) { return ''; }
      return String(props.modelValue);
    });
    const currTextCount = computed(() => {
      return props.modelValue.length;
    });
    const isOverTextLimit = computed(() => {
      return Number(currTextCount.value) > Number(props.textLimit);
    });
    const textAreaRows = computed(() => {
      return String(props.rows);
    });
    const resizeValue = computed(() => {
      if (typeof props.autosize === 'boolean' && props.autosize) { return true; }
      return props.autosize;
    });
    const cssStyle = computed(() => {
      if (props.width === '100%') {
        return {
          width: '100%',
        };
      }

      return {
        width: `${props.width}px`,
      };
    });

    const updateValue = (e, event) => {
      if (props.disabled) { return; }
      emit('update:modelValue', e.target.value);
      validFn(event);
    };

    const setInitInputFieldValue = () => {
      textareaRef.value.value = props.modelValue;
    };

    onMounted(() => {
      setInitInputFieldValue();
    });

    return {
      currTextCount,
      nativeTextareaValue,
      isOverTextLimit,
      textAreaRows,
      resizeValue,
      cssStyle,
      textareaRef,
      updateValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-textarea {
  width: 100%;
  display: inline-block;
  position: relative;

  &__native {
    // @include padding(10px);
    box-sizing: border-box;
    padding: 10px;
    width: 200px;
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: 0 transparent;

    &--disabled {
      // @include disabled;
      background-color: #efefef;
      cursor: not-allowed;
      opacity: 0.5;
    }

    &--autosize {
      &--none {
        resize: none;
      }

      &--vertical {
        resize: vertical;
      }

      &--horizontal {
        resize: horizontal;
      }
    }
  }
}

.count-limit {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #ccc;
  font-size: 14px;

  &--warning {
    color: $c-red;
  }
}
</style>
