import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSiteStore = defineStore('site', () => {
  const deviceType = ref([]);

  // const loginRegisterDrawerStatus = ref(false);

  const setDeviceType = () => {
    const width = document.body.clientWidth;
    const typeCollect = [];
    const rwdTyepMatching = {
      320: 'init',
      576: 'mobile',
      768: 'portrait',
      1024: 'tablet',
      1440: 'sm-pc',
      1600: 'pc',
      2560: 'lg-pc',
    };
    const widthList = [320, 576, 768, 1024, 1440, 1600, 2560];
    widthList.forEach((w) => {
      if (width >= w) {
        typeCollect.push(rwdTyepMatching[String(w)]);
      }
    });
    deviceType.value = typeCollect;
  };

  return {
    // state
    deviceType,

    // action
    setDeviceType,
  };
});
