<template>
  <p class="c-create-update-time">
    2022-09-02
  </p>
</template>

<script>
export default defineComponent({
  name: 'CreateUpdateTime',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
.c-create-update-time {
  @include font-style($c-black, 14, normal, 0.2px, 27px);
}
</style>
