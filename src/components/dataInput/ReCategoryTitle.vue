<template>
  <p class="cus-select-option">
    {{ title }}
  </p>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Cus Title',
  },
});
</script>

<style lang="scss" scoped>
.cus-select-option {
  @include font-style($c-deepblue, 14px, 700);
  position: relative;

  &::after {
    @include position(tl, calc(100% + 10px), 0);
    display: inline-block;
    width: 100%;
    height: 1px;
    content: "";
    background-color: $c-deepblue;
  }
}
</style>
