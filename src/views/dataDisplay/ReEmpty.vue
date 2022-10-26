<template>
  <div class="v-empty">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReEmpty />
      </div>
    </dev-section>
    <dev-section title="帶文字">
      <div class="wrap">
        <dev-props type="String" prop-name="empty-text" text="自訂說明文字" />
        <ReEmpty empty-text="無資料" />
      </div>
    </dev-section>
    <dev-section title="用於 select">
      <div class="wrap">
        <dev-desc text="載入五秒後顯示資料" />
        <ReSelect v-model="value1" :options="options">
          <template #noData>
            <ReEmpty empty-text="無資料" />
          </template>
        </ReSelect>
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReEmpty from '@/components/dataDisplay/ReEmpty.vue';
import ReSelect from '@/components/dataInput/ReSelect.vue';
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
    }, 5000);

    return {
      options,
      value1,
    };
  },
});
</script>

<style lang="scss" scoped></style>
