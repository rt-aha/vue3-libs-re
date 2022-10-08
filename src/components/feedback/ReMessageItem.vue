<template>
  <p class="message-text">
    {{ content }}
  </p>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['hide']);

onMounted(() => {
  setTimeout(() => {
    emit('hide');
  }, 2500);
});
</script>

<style lang="scss" scoped>
.message-text {
  color: #333;
}
</style>
