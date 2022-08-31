<template>
  <div class="v-empty">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReEmpty />
      </div>
    </dev-section>
    <dev-section title="帶文字">
      <div class="wrap">
        <ReEmpty emptyText="無資料" />
      </div>
    </dev-section>
    <dev-section title="帶文字">
      <div class="wrap">
        <ReSelect v-model="value1" :options="options">
          <template #noData>
            <ReEmpty emptyText="無資料" />
          </template>
        </ReSelect>
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReEmpty from '@/components/ReEmpty.vue';
import ReSelect from '@/components/ReSelect.vue';
import { basicOptions } from '@/config/mockOptions.js';

export default defineComponent({
  name: 'ViewEmpty',
  components: {
    ReEmpty,
    ReSelect,
  },
  setup() {
    const value1 = ref('');
    const options = ref([]);

    setTimeout(() => {
      options.value = basicOptions;
    }, 3000);

    return {
      options,
      value1,
    };
  },
});
</script>

<style lang="scss" scoped></style>
