<template>
  <div class="re-badge" :class="{ 're-badge--position': position !== '' }">
    <div class="re-badge__content" :class="{ 're-badge__content--position--left': position === 'left' }">
      <slot />
    </div>
    <div
      v-show="isShowZero"
      class="badge-box"
      :class="[`badge-box--position--${position}`, { 'badge-box--dot': dot }]"
      :style="{ 'background-color': color }"
    >
      <div class="badge-box__value-cell" :class="{ 'badge-box__value-cell--dot': dot }">
        <span v-if="!dot" class="badge-box__value-cell__value">{{ calcValue }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
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
      return ['', 'left', 'right'].includes(val);
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
    default: false,
  },
});

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
</script>

<style lang="scss" scoped>
.re-badge {
  position: relative;
  display: inline-block;

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
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  transform: translateX(50%);

  &--dot {
    @include circle(8px);
    top: 0;
    min-width: 8px;
    transform: translate(50%, -50%);
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
      width: auto;
      margin-left: 10px;
      transform: translateX(0);
    }

    &--left {
      position: static;
      order: 1;
      margin-right: 10px;
      transform: translateX(0);
    }
  }

  &__value-cell {
    @include padding(5px);
    display: flex;
    align-items: center;
    justify-content: center;
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
