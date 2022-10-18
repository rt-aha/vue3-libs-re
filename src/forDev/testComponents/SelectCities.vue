<template>
  <div class="c-select-cities">
    <div class="title">
      <p class="title__text">
        {{ data.selectCity }}
      </p>
      <p class="title__hint">
        (可複選)
      </p>
    </div>
    <ReCheckboxGroup v-model="cities" :options="filterOptions" />
    <div class="btns-wrap">
      <ReButton type="grey" @click="close">
        取消
      </ReButton>
      <ReButton type="gradient" @click="saveAndClose">
        確認
      </ReButton>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
// import { moreCityOptions } from '@/config/options';
import ReCheckboxGroup from '@/components/dataInput/ReCheckboxGroup.vue';
import ReButton from '@/components/common/ReButton.vue';

import taiwanCitiesRegions from '@/config/taiwanCitiesRegions';

const includeCities = ['台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市'];
const cityRegionOptions = taiwanCitiesRegions.reduce((obj, city) => {
  if (includeCities.includes(city.name)) {
    const opts = city.region.map((item) => {
      return {
        label: item.name,
        value: item.name,
      };
    });

    obj[city.name] = opts;
  }

  return obj;
}, {});

export default defineComponent({
  name: 'SelectCities',
  components: {
    ReCheckboxGroup,
    ReButton,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const cities = ref([]);

    const filterOptions = computed(() => {
      return cityRegionOptions[props.data.selectCity];
    });

    const close = () => {
      emit('close', { action: 'closeOnly' });
    };

    const saveAndClose = () => {
      emit('close', { action: 'saveAndClose', cities: cities.value });
    };

    const init = () => {
      cities.value = props.data.selectRegions;
    };

    init();

    return {
      ReCheckboxGroup,
      filterOptions,
      cities,
      close,
      saveAndClose,
    };
  },
});
</script>

<style lang="scss" scoped>
.c-select-cities {
  width: 600px;
}

.title {
  margin-bottom: 20px;

  &__text {
    @include font-style($c-grey, 20, 400, 1.6px, 20px);
    display: inline-block;
  }

  &__hint {
    @include font-style($c-input-hint, 16, 400, 1.4px, 24px);
    display: inline-block;
    margin-right: 5px;
  }
}

.btns-wrap {
  @include flex(center);
  margin-top: 50px;
}
</style>
