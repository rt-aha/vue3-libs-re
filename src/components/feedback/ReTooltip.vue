<template>
  <div class="re-tooltip">
    <slot />
    <p
      class="re-tooltip__desc"
      :class="[`re-tooltip__desc--${placement}`, `re-tooltip__desc--cus-type--${cusPlacementType}`]"
    >
      {{ label }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: [String, Number],
    default: 'tooltip',
  },
  placement: {
    type: String,
    default: 'center',
  },
  cusPlacementType: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.re-tooltip {
  position: relative;

  &:hover {
    .re-tooltip__desc {
      display: inline-block;
    }
  }

  &__desc {
    @include padding(4px 6px);
    @include font-style($c-white, 12);
    display: none;
    white-space: nowrap;
    background-color: rgba($c-black, 0.8);
    border-radius: 4px;

    &--left {
      @include position(tl, -100%, 0);
    }

    &--center {
      @include position(tl, 0%, 50%);
      transform: translate(-50%, calc(-100% - 5px));
    }

    &--cus-type {
      @include position(tl, -100%, 50%);
      transform: translateX(-50%);

      &--order-name {
        @include position(tl, -25px, 50%);
      }
    }
  }
}
</style>
