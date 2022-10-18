<template>
  <div class="ly-header">
    <div class="ly-header__content">
      <p class="rakuen">
        Vue3 Component Library
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LyHeader',
});
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped>
@import "@/styles/utils/_rwd";

.ly-header {
  height: 50px;
  background-color: $c-deepblue;
  background: linear-gradient(225deg, #ff3cac 0%, #784ba0 20%, #2b86c5 100%);
  box-shadow: 0 0 10px #aaa;

  &__content {
    height: 100%;
    @include flex();
    @include padding(0 10px);
  }
}

.rakuen {
  @include font-style($c-white, 20, 400, 2px);
}
</style>
