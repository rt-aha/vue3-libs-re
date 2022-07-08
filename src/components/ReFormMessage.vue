<template>
  <p class="re-form-message">
    {{errorMessage}}
  </p>
</template>

<script>
  import { defineComponent } from 'vue';
  
export default defineComponent({
  name: 'ReReFormMessage',
  props: {
    errorMessage: {
      type: String,
      default: ''
    }
  }
});
</script>

<style lang="scss" scoped>
.re-form-message {
  @include font-style($c-error, 12, 400, 1px);
}
</style>
