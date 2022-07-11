<template>
  <div class="re-radio">
    <ul class="radio-list">
      <li
        class="radio-list__item"
        :class="{
          'radio-list__item--actived': opt.value === modelValue,
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
              @change="handleChange(opt.value)"
              :checked="opt.value === modelValue"
              :value="opt.value"
              :id="uuid + String(idx)"
            />
          </div>
          <div class="radio-list__item__label__text-box">
            <span class="radio-list__item__label__text-box__label">{{ opt.label }}</span>
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { v4 as uuid } from 'uuid';

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
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleChange = (val) => {
      emit('update:modelValue', val);
    };

    return {
      handleChange,
      uuid: uuid(),
    };
  },
});
</script>

<style lang="scss" scoped>
.radio-list {
  &__item {
    &--actived {
      .radio-list__item__label__selected {
        border: 1px solid $c-main;
        position: relative;

        &::before {
          content: '';
          @include circle(8px);
          @include position(center);
          transform: translate(-50%, -50%);
          display: inline-block;
          background-color: $c-main;
        }
      }
    }

    & + & {
      margin-top: 10px;
    }

    &__label {
      display: inline-block;
      @include flex();

      &__selected {
        @include circle(12px);
        border: 1px solid $c-grey;
      }

      &__text-box {
        margin-left: 5px;

        &__label {
          @include font-style($c-input-label, 14, 400, 1px);
        }
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
