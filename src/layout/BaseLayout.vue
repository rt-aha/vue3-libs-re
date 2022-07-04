<template>
  <div class="ly-base-layout">
    <div class="ly-base-layout__header">
      <ly-header />
    </div>

    <div class="ly-base-layout__body">
      <router-view />
    </div>

    <div class="ly-base-layout__footer">
      <ly-footer />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import LyHeader from '@/layout/LyHeader.vue';
import LyFooter from '@/layout/LyFooter.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    LyHeader,
    LyFooter,
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
    flex: 1;
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
