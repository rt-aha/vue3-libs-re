<template>
  <button class="c-button" @click="onClick">
    <span class="c-button__content">
      <slot />
    </span>
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ReButton',
  emit: ['emit'],
  setup(props, { emit }) {
    const onClick = () => {
      emit('onClick');
    };

    return {
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.c-button {
  width: auto;
  height: 40px;
  @include padding(0 12px);
  border: 0;
  outline: 0;
  text-align: center;
  cursor: pointer;

  & + & {
    margin-left: 10px;
  }

  &__content {
    @include flex();
  }
}
</style>
