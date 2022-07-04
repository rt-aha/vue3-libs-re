import { computed } from 'vue';
import { useSiteStore } from '@/stores/site';

// 在特定 breakpoint 下才套用 g-content
export default (defaultDeviceType = 'tablet') => {
  const siteStore = useSiteStore();

  const addGContent = computed(() => {
    if (siteStore.deviceType.includes(defaultDeviceType)) {
      return true;
    }

    return false;
  });

  return addGContent;
};
