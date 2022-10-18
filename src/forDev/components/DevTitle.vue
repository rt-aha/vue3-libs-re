<template>
  <p class="dev-title" :class="[`dev-title--size--${size}`]">
    <slot />
  </p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DevTitle',
  components: {},
  props: {
    size: {
      type: String,
      default: 'default',
    },
  },
});
</script>

<style lang="scss" scoped>
.dev-title {
  @include padding(10px);
  position: relative;

  &--size {
    &--default {
      @include font-style(#999, 14, 400, 0.5px);

      &::before {
        @include position(tl, 50%, 0);
        display: inline-block;
        width: 2px;
        height: 15px;
        content: "";
        background-color: #999;
        transform: translateY(-50%);
      }
    }

    &--main {
      @include font-style(#555, 18, 400, 0.5px);

      &::before {
        @include position(tl, 50%, 0);
        display: inline-block;
        width: 4px;
        height: 20px;
        content: "";
        background-color: #555;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
