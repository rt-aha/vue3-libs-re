<template>
  <p class="re-form-message">
    <span v-if="errorMessage" class="re-form-message__text">
      {{ errorMessage }}
    </span>
  </p>
</template>

<script setup>
const props = defineProps({
  errorMessage: {
    default: '',
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
