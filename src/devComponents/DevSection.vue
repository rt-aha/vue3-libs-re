<template>
  <div class="dev-section">
    <dev-title>
      {{ title }}
    </dev-title>
    <div class="dev-section__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import DevTitle from '@/devComponents/DevTitle.vue';

export default defineComponent({
  name: 'DevSection',
  components: {
    DevTitle,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.dev-section {
  @include padding(30px 0);

  & + & {
    border-top: 1px solid rgba($c-lightgrey, 0.5);
  }

  &__content {
    margin-top: 20px;
  }
}
</style>
