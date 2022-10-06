<template>
  <p class="dev-events" :class="{ 'dev-events--mt': mt }">
    <span class="dev-events__label"> - event: </span>
    <span class="dev-events__event"> {{ eventName }} </span>
    <span v-if="type" class="dev-events__type">&lt{{ type }}&gt </span>
    <span class="dev-events__text"> {{ text }} </span>
  </p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DevEvents',

  props: {
    text: {
      type: String,
      default: '',
    },
    eventName: {
      type: String,
      default: '',
    },
    type: {
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
.dev-events {
  margin-bottom: 10px;

  &--mt {
    margin-top: 20px;
  }

  &__label {
    @include font-style(#555, 14, 400, 0.5px);
  }

  &__event {
    @include font-style(#333, 14, 700, 0.5px);
  }

  &__type {
    @include font-style(#555, 14, 400, 0.5px);
  }

  &__text {
    @include font-style(#555, 14, 400, 0.5px);
  }
}
</style>
