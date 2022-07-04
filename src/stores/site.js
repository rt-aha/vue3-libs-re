import { defineStore } from 'pinia';

export const useSiteStore = defineStore({
  id: 'site',
  state: () => ({
    deviceType: [],
  }),
  actions: {
    setDeviceType() {
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
      this.deviceType = typeCollect;
    },
  },
});

export const a = '';
