<template>
  <div class="dev-breadcrumb-content">
    custom {{ label }}
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
</style>
