<template>
  <p class="re-form-message">
    <span class="re-form-message__text" v-if="errorMessage">
      {{ errorMessage }}
    </span>
  </p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ReReFormMessage',
  props: {
    errorMessage: {
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.re-form-message {
  &__text {
    @include font-style($c-error, 12, 400, 1px);
  }
}
</style>
