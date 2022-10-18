<template>
  <p class="dev-desc" :class="{ 'dev-desc--mt': mt }">
    - {{ text }}
  </p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DevDesc',

  props: {
    text: {
      type: String,
      default: '',
    },
    mt: {
      type: Boolean,
      dfeault: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.dev-desc {
  @include font-style(#555, 14, 400, 0.5px);
  margin-bottom: 10px;

  &--mt {
    margin-top: 20px;
  }
}
</style>
