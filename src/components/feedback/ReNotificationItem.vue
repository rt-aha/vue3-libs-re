<template>
  <p
    class="re-message-item"
    :class="{
      're-message-item--slide-out': slideOut,
    }"
    @animationend.stop="handleAniamtionEnd"
  >
    {{ content }}
  </p>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close']);

const timer = ref(null);
const slideOut = ref(false);

const handleAniamtionEnd = (e) => {
  if (e.animationName.includes('slideOut')) {
    emit('close');
  }
};

timer.value = setTimeout(() => {
  slideOut.value = true;
}, 2500);

onUnmounted(() => {
  clearTimeout(timer.value);
  timer.value = null;
});
</script>

<style lang="scss" scoped>
@keyframes slideIn {
  from {
    transform: translateX(200%);
  }

  to {
    transform: translateX(0);
  }
}
@keyframes slideOut {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(200%);
  }
}

.re-message-item {
  @include padding(10px 20px);
  @include font-style(#333, 16);
  background-color: $c-white;
  border-radius: 4px;
  box-shadow: 3px 3px 6px rgba($c-black, 0.2);
  animation: slideIn 0.2s linear;

  &--slide-out {
    animation: slideOut 0.2s linear;
  }

  & + & {
    margin-top: 12px;
  }
}
</style>
