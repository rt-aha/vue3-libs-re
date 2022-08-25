<template>
  <div class="v-re-select">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReSelect v-model="value1" :options="phoneOptions" />
      </div>
    </dev-section>
    <dev-section title="禁用">
      <div class="wrap">
        <dev-desc type="boolean">disabled：禁用</dev-desc>
        <ReSelect v-model="value2" :options="phoneOptions3" />
      </div>
    </dev-section>
    <dev-section title="多選">
      <div class="wrap">
        <dev-desc type="boolean">multiple：是否可多選</dev-desc>
        <ReSelect v-model="value3" :options="phoneOptions3" multiple />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReSelect from '@/components/ReSelect.vue';
import { phoneOptions, phoneOptions3 } from '@/config/mockOptions.js';

export default defineComponent({
  name: 'ViewReSelect',
  components: {
    ReSelect,
  },
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref([]);

    return {
      phoneOptions,
      phoneOptions3,
      value1,
      value2,
      value3,
    };
  },
});
</script>

<style lang="scss" scoped></style>
