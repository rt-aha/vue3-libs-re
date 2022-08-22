<template>
  <div class="re-badge" :class="{ 're-badge--position': position !== '' }">
    <div class="re-badge__content" :class="{ 're-badge__content--position--left': position === 'left' }">
      <slot></slot>
    </div>
    <div
      class="badge-box"
      :class="[`badge-box--position--${position}`, { 'badge-box--dot': dot }]"
      :style="{ 'background-color': color }"
      v-show="isShowZero"
    >
      <div class="badge-box__value-cell" :class="{ 'badge-box__value-cell--dot': dot }">
        <span class="badge-box__value-cell__value" v-if="!dot">{{ calcValue }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ReBadge',
  props: {
    value: {
      type: [String, Number],
      default: '12',
    },
    color: {
      type: String,
      default: '#032f60',
    },
    position: {
      type: String,
      default: '',
      validator(val) {
        return ['', 'left', 'right'].indexOf(val) > -1;
      },
    },
    dot: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: [String, Number, undefined],
      default: undefined,
    },
    showZero: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const calcValue = computed(() => {
      if (props.limit) {
        if (Number(props.value) > Number(props.limit)) {
          return `${props.limit}+`;
        }
      }

      return props.value;
    });

    const isShowZero = computed(() => {
      if (!props.showZero) {
        if (props.value <= 0) {
          return false;
        }
      }

      return true;
    });

    return {
      calcValue,
      isShowZero,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-badge {
  display: inline-block;
  position: relative;

  // position === left or position === right
  &--position {
    display: inline-flex;
    align-items: center;
  }

  &__content {
    &--position {
      &--left {
        order: 2;
      }
    }
  }
}

.badge-box {
  @include position(tr, -10px, 0);
  transform: translateX(50%);
  min-width: 20px;
  height: 20px;
  border-radius: 10px;

  &--dot {
    @include circle(8px);
    top: 0;
    transform: translate(50%, -50%);
    min-width: 8px;
  }

  /* &--color-type {
    &--default {
      background-color: $c-badge--default;
    }

    &--brown {
      background-color: $c-badge--brown;
    }

    &--green {
      background-color: $c-badge--green;
    }

    &--red {
      background-color: $c-badge--red;
    }
  } */

  &--position {
    &--right {
      position: static;
      transform: translateX(0);
      width: auto;
      margin-left: 10px;
    }

    &--left {
      order: 1;
      position: static;
      transform: translateX(0);
      margin-right: 10px;
    }
  }

  &__value-cell {
    @include padding(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    &--dot {
      display: none;
    }

    &__value {
      @include font-style($c-white, 12);
      display: inline-block;
    }
  }
}
</style>
