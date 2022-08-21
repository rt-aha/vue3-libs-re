<template>
  <div class="re-radio" :class="[`re-radio--direction--${direction}`]">
    <ul class="radio-list">
      <li
        class="radio-list__item"
        :class="{
          'radio-list__item--actived': opt.value === modelValue,
          'radio-list__item--disabled': opt.disabled,
        }"
        v-for="(opt, idx) of optionConfig"
        :key="opt.value"
      >
        <label class="radio-list__item__label" :for="uuid + String(idx)">
          <div class="radio-list__item__label__selected">
            <input
              class="re-radio-input__field"
              type="radio"
              :name="uuid"
              @change="handleChange(opt)"
              :checked="opt.value === modelValue"
              :value="opt.value"
              :id="uuid + String(idx)"
            />
          </div>
          <div class="radio-list__item__label__component" v-if="opt.render">
            <component :is="opt.render" v-bind="opt" />
          </div>
          <div class="radio-list__item__label__text-box" v-else>
            <span class="radio-list__item__label__text-box__label">{{ opt.label }} {{ opt.disabled }}</span>
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { v4 as uuid } from 'uuid';
import useValidate from '@/hooks/useValidate';

export default defineComponent({
  name: 'ReRadio',
  props: {
    modelValue: {
      default: null,
    },
    optionConfig: {
      type: Array,
      default: () => [],
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { validFn } = useValidate();

    const handleChange = (opt) => {
      if (opt.disabled) return;

      emit('update:modelValue', opt.value);
      validFn('change');
    };

    return {
      handleChange,
      uuid: uuid(),
    };
  },
});
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
        border: 1px solid $c-main;
        position: relative;

        &::before {
          content: '';
          @include circle(10px);
          @include position(center);
          transform: translate(-50%, -50%);
          display: inline-block;
          background-color: $c-main;
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
      display: inline-block;
      @include flex(flex-start, flex-start);
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
