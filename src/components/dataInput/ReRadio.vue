<template>
  <div class="re-radio" :class="[`re-radio--direction--${direction}`]">
    <ul class="radio-list">
      <li
        v-for="(opt, idx) of options"
        :key="opt.value"
        class="radio-list__item"
        :class="{
          'radio-list__item--actived': opt.value === modelValue,
          'radio-list__item--disabled': opt.disabled,
        }"
      >
        <label class="radio-list__item__label" :for="uuid + String(idx)">
          <div class="radio-list__item__label__selected">
            <input
              :id="uuid + String(idx)"
              class="re-radio-input__field"
              type="radio"
              :name="uuid"
              :checked="opt.value === modelValue"
              :value="opt.value"
              @change="handleChange(opt)"
            >
          </div>
          <div v-if="opt.render" class="radio-list__item__label__component">
            <component :is="opt.render" v-bind="opt" />
          </div>
          <div v-else class="radio-list__item__label__text-box">
            <span class="radio-list__item__label__text-box__label">{{ opt.label }} {{ opt.disabled }}</span>
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup>
import useValidate from '@/hooks/useValidate';

const props = defineProps({
  modelValue: {
    default: null,
  },
  options: {
    type: Array,
    default: () => [],
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
});
const emit = defineEmits(['update:modelValue', 'onChange']);

const { validFn } = useValidate();

const handleChange = (opt) => {
  if (opt.disabled) { return; }

  emit('update:modelValue', opt.value);
  emit('onChange', opt);
  validFn('change');
};

const uuid = nanoid();
</script>

<style lang="scss" scoped>
.re-radio {
  &--direction {
    &--horizontal {
      color: blue;

      .radio-list__item {
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }

    &--vertical {
      .radio-list__item {
        display: block;
        width: 100%;
      }
    }
  }
}

.radio-list {
  width: 100%;

  &__item {
    /* width: 100%; */
    cursor: pointer;

    &--actived {
      .radio-list__item__label__selected {
        position: relative;
        border: 1px solid $c-deepblue;

        &::before {
          @include circle(10px);
          @include position(center);
          display: inline-block;
          content: "";
          background-color: $c-deepblue;
          transform: translate(-50%, -50%);
        }
      }
    }

    &--disabled {
      opacity: 0.5;

      .radio-list__item__label {
        cursor: not-allowed;
      }
    }

    & + & {
      margin-top: 10px;
    }

    &__label {
      @include flex(flex-start, flex-start);
      display: inline-block;
      cursor: pointer;

      &__selected {
        @include circle(16px);
        border: 1px solid $c-grey;
      }

      &__text-box {
        margin-left: 5px;

        &__label {
          @include font-style($c-input-label, 14, 400, 1px, 18px);
        }
      }

      &__component {
        margin-left: 5px;
      }
    }
  }
}

.re-radio-input {
  &__field {
    display: none;
  }
}
</style>
