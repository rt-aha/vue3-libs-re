<template>
  <div class="c-content-layout">
    <div class="c-content-layout__first">
      <slot name="first" />
    </div>
    <div class="c-content-layout__second">
      <slot name="second" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContentLayout',
});
</script>

<style lang="scss" scoped>
@import "@/styles/utils/_rwd";

.c-content-layout {
  &__first {
  }

  &__second {
  }
}
@media screen and (min-width: $tablet) {
  .c-content-layout {
    @include flex(flex-start, flex-start);
    margin: 0 -10px;

    &__first {
      @include padding(0 10px);
      flex: none;
      width: 50%;
    }

    &__second {
      @include padding(0 10px);
      flex: none;
      width: 50%;
    }
  }
}
</style>
