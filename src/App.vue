<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { debounce } from 'lodash-es';
import { useSiteStore } from '@/stores/site';

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const siteStore = useSiteStore();
    const reCalcWindowWidthDebounce = debounce(() => {
      siteStore.setDeviceType();
    }, 100);
    onMounted(() => {
      siteStore.setDeviceType();
      window.addEventListener('resize', reCalcWindowWidthDebounce);
    });
  },
});
</script>
