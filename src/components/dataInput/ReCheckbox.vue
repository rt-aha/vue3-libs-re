<template>
  <div class="re-checkbox" :class="[`re-checkbox--direction--${direction}`]">
    <template>
      <input
        :id="uuid"
        class="re-checkbox__field"
        type="checkbox"
        :value="modelValue"
        :checked="modelValue"
        @change="handleChange"
      >
    </template>

    <ul class="chk-list">
      <li
        class="chk-list__item"
        :class="{
          'chk-list__item--disabled': disabled,
        }"
      >
        <label class="chk-list__item__label" :for="uuid">
          <div
            class="chk-list__item__label__option"
            :class="{
              'chk-list__item__label__option--actived': modelValue,
            }"
          />
          <div class="chk-list__item__label__content">
            <component :is="render" v-bind="$attrs" v-if="render" />
            <p v-else class="chk-list__item__label__content__label">{{ label }}</p>
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
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
  render: {
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'onChange']);

const { validFn } = useValidate();

const handleChange = () => {
  if (props.disabled) { return; }
  emit('update:modelValue', !props.modelValue);
  emit('onChange', !props.modelValue);
  validFn('change');
};

const uuid = nanoid();
</script>

<style lang="scss" scoped>
// * {
//   outline: 1px solid #f00;
// }

.re-checkbox {
  width: 100%;

  &--direction {
    &--horizontal {
      color: blue;

      .chk-list__item {
        display: inline-block;
        // margin-right: 10px;
        // margin-bottom: 10pxs;
      }
    }

    &--vertical {
      .chk-list__item {
        display: block;
        width: 100%;
      }
    }
  }

  &__field {
    display: none;
  }
}

.chk-list {
  width: 100%;

  &__item {
    margin: 5px 10px 5px 0;

    &--disabled {
      opacity: 0.5;

      .chk-list__item__label {
        cursor: not-allowed;
      }
    }

    // & + & {
    //   margin-top: 10px;
    // }

    &__label {
      @include flex(flex-start, flex-start);
      cursor: pointer;

      &__option {
        box-sizing: border-box;
        flex: none;
        width: 18px;
        height: 18px;
        border: 1px solid $c-form-main;
        border-radius: 2px;

        &--actived {
          position: relative;

          &::after {
            @include position(center);
            display: block;
            width: 8px;
            height: 8px;
            content: "";
            background-color: $c-form-selected;
            border: 1px solid $c-form-selected;
            border-radius: 2px;
          }
        }
      }

      &__content {
        flex: 1;
        margin-left: 5px;

        &__label {
          @include font-style($c-form-main, 14, 400, 1px 14px);
          flex: 1;
        }
      }
    }
  }
}
</style>
