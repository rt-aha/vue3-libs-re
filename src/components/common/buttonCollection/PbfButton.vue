<template>
  <button
    class="pbf-btn"
    :class="[
      `pbf-btn--color--${color}`,
      {
        'pbf-btn--shadow': shadow,
        'pbf-btn--padding': width === 'auto',
        'pbf-btn--disabled': loading || disabled,
      },
    ]"
    :style="{ width: w, maxWidth: mW }"
    :disabled="loading || disabled"
    @click="handleClick"
  >
    <slot />
    <loading v-if="loading" />
    <img v-show="arrow" class="pbf-btn__img" src="@/assets/icon/go.svg">
  </button>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PbfButton',
  props: {
    arrow: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: '150',
    },
    maxWidth: {
      type: [String, Number],
      default: 'auto',
    },
    color: {
      type: String,
      default: '',
    },
    auto: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const w = computed(() => {
      if (props.width === 'auto' || props.width === '100%') {
        return props.width;
      }

      if (isNumber(Number(props.width))) {
        return `${props.width}px`;
      }

      return 'auto';
    });

    const mW = computed(() => {
      if (props.maxWidth === 'auto' || props.maxWidth === '100%') {
        return props.maxWidth;
      }

      if (isNumber(Number(props.maxWidth))) {
        return `${props.maxWidth}px`;
      }

      return 'auto';
    });

    const handleClick = (e) => {
      emit('click', e);
    };

    return {
      w,
      mW,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.pbf-btn {
  @include flex(center);
  @include font-style($c-deepblue, 16, 500, 1.6px);
  width: 100%;
  height: 40px;
  white-space: nowrap;
  cursor: pointer;
  background-color: $c-assist-yellow;
  border: 2px solid $c-assist-yellow;
  border-radius: 20px;
  outline: 0 transparent;
  // width: auto;
  transition: 0.4s;

  & + & {
    margin-left: 20px;
  }

  &:hover {
    background-color: $c-white;
  }

  &--padding {
    @include padding(0 20px);
  }

  &--shadow {
    box-shadow: 0 3px 10px #0000001a;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;

    &:hover {
      background-color: $c-assist-yellow;
    }
  }

  &--color {
    &--pink {
      color: $c-white;
      background-color: $c-assist-pink;
      border: 2px solid $c-assist-pink;

      &:hover {
        color: $c-assist-pink;
        background-color: $c-white;
      }
    }

    &--purple {
      color: $c-white;
      background-color: #d3a9e0;
    }

    &--green {
      color: $c-white;
      background-color: $c-assist-green;
      border: 2px solid $c-assist-green;

      &:hover {
        color: $c-assist-green;
        background-color: $c-white;
      }
    }

    &--blue {
      color: $c-white;
      background-color: #83d0e6;
    }
  }

  &__img {
    margin-left: 8px;
  }
}
</style>
