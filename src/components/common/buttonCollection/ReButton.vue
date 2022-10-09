<template>
  <button
    class="re-button"
    :disabled="disabled || isLoading"
    :class="[
      `re-button--${type}`,
      `re-button--size--${size}`,
      `re-button--round--${round}`,
      {
        're-button--disabled': disabled || isLoading,
      },
    ]"
    :style="setExtraStyle"
    @click="handleClick"
  >
    <span v-if="slots.prefix" class="re-button__prefix">
      <slot name="prefix" />
    </span>
    <span class="re-button__content" :class="[{ 're-button__content--circle': extra === 'circle' }]">
      <slot />
    </span>
    <span v-if="slots.suffix" class="re-button__suffix">
      <slot name="suffix" />
    </span>
    <span v-if="isLoading" class="re-button__loading">
      <span
        class="re-button__loading__icon"
        :class="{
          're-button__loading__icon--main-color': ['border', 'plain'].includes(type),
        }"
      />
    </span>
  </button>
</template>

<script setup>
import { useSlots } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'default',
    validator(val) {
      return ['default', 'border', 'plain', 'circle'].includes(val);
    },
  },
  size: {
    type: String,
    default: 'default',
    validator(val) {
      return ['small', 'default', 'large'].includes(val);
    },
  },
  round: {
    type: String,
    default: 'default',
    validator(val) {
      return ['none', 'default', 'round'].includes(val);
    },
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  extra: {
    type: String,
    default: '',
  },
  bgColor: {
    default: '',
    validator: (val) => {
      if (val) {
        const colorCodeRegExp = /^#[A-F0-9]{6}$/;
        return colorCodeRegExp.test(val);
      }

      return true;
    },
  },
});
const emit = defineEmits(['click']);
const slots = useSlots();

const setExtraStyle = computed(() => {
  let extraStyles = {};

  if (props.bgColor) {
    extraStyles['background-color'] = props.bgColor;
  }

  if (props.extra === 'circle') {
    let wh = 36;
    switch (props.size) {
      case 'small':
        wh = 32;
        break;
      case 'large':
        wh = 40;
        break;
      default:
        wh = 36;
        break;
    }

    extraStyles = {
      ...extraStyles,
      'width': `${wh}px`,
      'height': `${wh}px`,
      'border-radius': `${wh / 2}px`,
    };
  }

  return extraStyles;
});

const handleClick = (e) => {
  emit('click', e);
};
</script>

<style lang="scss" scoped>
.re-button {
  @include padding(0px 16px);
  @include set-btn-default();
  @include font-style($c-white, 14px);
  display: inline-block;
  position: relative;
  border: 0;

  &:hover {
    opacity: 0.8;
  }

  & + & {
    margin-left: 8px;
  }

  &--size {
    &--small {
      height: 32px;
    }

    &--default {
      height: 36px;
    }

    &--large {
      height: 40px;
    }
  }

  &--round {
    border-radius: 4px;

    &--none {
      border-radius: 0;
    }

    &--default {
      border-radius: 4px;
    }

    &--round {
      border-radius: 50px; // 只是寫一個很大的數字
    }
  }

  &--default {
    background-color: $c-deepblue;
  }

  &--border {
    color: $c-deepblue;
    border: 1px solid $c-deepblue;
  }

  &--plain {
    color: $c-deepblue;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__prefix {
    display: inline-block;
    margin-right: 4px;
  }

  &__content {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    &--circle {
      @include position(center);
    }
  }

  &__suffix {
    display: inline-block;
    margin-left: 4px;
  }

  &__loading {
    &__icon {
      display: inline-block;
      box-sizing: border-box;
      width: 10px;
      height: 10px;
      margin-left: 4px;
      border: 1px solid $c-white;
      border-left-color: transparent;
      border-radius: 50%;
      animation: btn-loading 2s linear infinite;

      &--main-color {
        border-color: $c-grey;
        border-left-color: transparent;
      }
    }
  }
}

@keyframes btn-loading {
  from {
    transform: rotate(0deg);
  }

  from {
    transform: rotate(360deg);
  }
}
</style>
