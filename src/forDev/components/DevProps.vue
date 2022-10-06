<template>
  <p class="dev-desc" :class="{ 'dev-desc--mt': mt }">
    <span class="dev-desc__label"> - prop: </span>
    <span class="dev-desc__prop"> {{ propName }} </span>
    <span v-if="type" class="dev-desc__type">&lt{{ type }}&gt </span>
    <span class="dev-desc__text"> {{ text }} </span>
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
    propName: {
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
.dev-desc {
  margin-bottom: 10px;

  &--mt {
    margin-top: 20px;
  }

  &__label {
    @include font-style(#555, 14, 400, 0.5px);
  }

  &__prop {
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
