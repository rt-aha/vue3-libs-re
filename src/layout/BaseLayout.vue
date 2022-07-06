<template>
  <div class="ly-base-layout">
    <div class="ly-base-layout__header">
      <ly-header />
    </div>

    <div class="ly-base-layout__body">
      <div class="ly-base-layout__body__sidebar">
        <ly-sidebar />
      </div>
      <div class="ly-base-layout__body__container">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import LyHeader from '@/layout/LyHeader.vue';
import LySidebar from '@/layout/LySidebar.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    LyHeader,
    LySidebar,
  },
  setup() {
    const route = useRoute();

    return {
      route,
    };
  },
});
</script>

<style lang="scss" scoped>
.ly-base-layout {
  width: 100%;
  height: 100%;
  // min-height: 100%;
  @include flex(flex-start, flex-start, column);

  &__header {
    width: 100%;
    height: auto;
    flex: none;
    position: relative;
    z-index: $zi-header;
  }

  &__body {
    width: 100%;
    height: 100%;
    flex: 1;
    @include flex(flex-start, flex-start);

    &__sidebar {
      flex: none;
      // width: 220px;
      display: inline-block;
      height: 100%;
    }

    &__container {
      flex: 1;
      height: 100%;
      @include padding(25px);
    }
  }

  &__footer {
    position: relative;
    z-index: 10;
    width: 100%;
    height: auto;
    flex: none;
  }
}
</style>
