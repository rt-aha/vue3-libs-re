<template>
  <div class="dev-section">
    <DevTitle>
      {{ title }}
    </DevTitle>
    <div class="dev-section__content" :class="{ 'dev-section__content--verticle': verticle }">
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import DevTitle from '@/forDev/components/DevTitle.vue';

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
    verticle: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.dev-section {
  @include padding(30px 0);

  & + & {
    border-top: 2px solid rgba($c-lightgrey, 0.5);
  }

  &__content {
    margin-top: 20px;
    @include flex(flex-start, flex-start);

    &--verticle {
      @include flex(flex-start, flex-start, column);
    }

    * {
      margin-left: 30px;

      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>

<style lang="scss">
.dev-section {
  width: 100%;

  &__content {
    > * {
      margin-left: 30px;

      &:first-child {
        margin-left: 0;
      }
    }

    &--verticle {
      * {
        /* margin-top: 10px; */
        margin-left: 0px;

        &:first-child {
          margin-left: 0;
          /* margin-top: 0; */
        }
      }
    }
  }
}
</style>
