<template>
  <button class="c-button" :class="`c-button--type--${type}`" @click.stop="onClick">
    <span class="c-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'gradient',
  },
});
const emit = defineEmits(['click']);

const onClick = () => {
  emit('click');
};
</script>

<style lang="scss" scoped>
.c-button {
  @include padding(0 20px);
  width: auto;
  height: 40px;
  text-align: center;
  cursor: pointer;
  border: 0;
  outline: 0;

  & + & {
    margin-left: 10px;
  }

  &--type {
    &--gradient {
      @include font-style($c-white, 16, 400, 2px, 27px);

      /* width: 160px; */
      height: 46px;
      // background: transparent linear-gradient(90deg, #2eaed0 0%, #07b253 100%) 0% 0% no-repeat padding-box;
      background-image: linear-gradient(225deg, #ff3cac 0%, #784ba0 50%, #2b86c5 100%);
      border-radius: 30px;
    }

    &--grey {
      @include font-style($c-white, 16, 400, 2px, 27px);

      /* width: 160px; */
      height: 46px;
      background: $c-grey;
      border-radius: 30px;
    }

    &--blue {
      @include font-style($c-white, 16, 400, 2px, 27px);

      /* width: 160px; */
      height: 46px;
      background: $c-deepblue;
      border-radius: 30px;
    }

    &--plain {
      @include font-style($c-grey, 16, 400, 2px, 27px);

      /* width: 'auto'; */
      height: 46px;
      background: transparent;
    }

    &--small-plain {
      @include font-style($c-grey, 12, 400, 2px, 20px);
      width: "auto";
      height: 20px;
      background-color: transparent;
      border: 1px solid $c-grey;
      border-radius: 2px;
    }
  }

  &__content {
    @include flex(center);
  }
}
</style>
