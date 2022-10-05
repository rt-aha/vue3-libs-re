<template>
  <div class="re-empty">
    <div class="re-empty__content">
      <img class="re-empty__content__icon" src="@/assets/icon/no-data.svg">
      <p class="re-empty__content__text">
        {{ emptyText }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ReEmpty',
  props: {
    emptyText: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.re-empty {
  @include flex(center, center, column);
  @include padding(30px 10px);
  // background-color: #efefef;

  &__content {
    text-align: center;

    &__icon {
    }

    &__text {
      margin-top: 5px;
      @include font-style($c-text1, 14);
    }
  }
}
</style>
