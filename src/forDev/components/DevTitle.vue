<template>
  <p class="dev-title">
    <slot></slot>
  </p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DevTitle',
  components: {},
});
</script>

<style lang="scss" scoped>
.dev-title {
  position: relative;
  @include padding(10px);
  @include font-style(#999, 14);

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
</style>
