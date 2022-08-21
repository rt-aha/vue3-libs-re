<template>
  <p class="dev-title" :class="[`dev-title--size--${size}`]">
    <slot></slot>
  </p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DevTitle',
  props: {
    size: {
      type: String,
      default: 'default',
    },
  },
  components: {},
});
</script>

<style lang="scss" scoped>
.dev-title {
  position: relative;
  @include padding(10px);

  &--size {
    &--default {
      @include font-style(#999, 14, 400, 0.5px);

      &::before {
        content: '';
        width: 2px;
        height: 15px;
        background-color: #999;
        display: inline-block;
        @include position(tl, 50%, 0);
        transform: translateY(-50%);
      }
    }
    &--main {
      @include font-style(#555, 18, 400, 0.5px);

      &::before {
        content: '';
        width: 4px;
        height: 20px;
        background-color: #555;
        display: inline-block;
        @include position(tl, 50%, 0);
        transform: translateY(-50%);
      }
    }
  }
}
</style>
