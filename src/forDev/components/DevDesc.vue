<template>
  <p class="dev-desc">
    <span class="dev-desc__api"> {{ api }} </span>
    <span class="dev-desc__type" v-if="type"> &lt{{ type }}&gt</span>
    <span class="dev-desc__slot"> - <slot /> </span>
  </p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DevDesc',

  props: {
    desc: {
      type: String,
      default: '',
    },
    api: {
      type: String,
      default: 'props',
    },
    type: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.dev-desc {
  margin-bottom: 10px;

  &__api {
    @include font-style(#555, 14, 400, 0.5px);
  }

  &__type {
    @include font-style(#555, 14, 400, 0.5px);
  }

  &__slot {
    @include font-style(#555, 14, 400, 0.5px);
  }
}
</style>
