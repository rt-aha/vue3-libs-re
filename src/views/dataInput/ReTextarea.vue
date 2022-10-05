<template>
  <div class="v-re-textarea">
    <dev-section title="基本使用">
      <div>
        <ReTextarea v-model="textarea1" />
      </div>
    </dev-section>

    <dev-section title="限制字數提醒、行數設定">
      <div>
        <ReTextarea v-model="textarea2" text-limit="5" rows="5" />
      </div>
    </dev-section>

    <dev-section title="resize">
      <ReTextarea v-model="textarea3" autosize="none" />
      <ReTextarea v-model="textarea3" autosize="vertical" />
      <ReTextarea v-model="textarea3" autosize="horizontal" />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReTextarea from '@/components/dataInput/ReTextarea.vue';

export default defineComponent({
  name: 'ViewReTextarea',
  components: {
    ReTextarea,
  },
  setup() {
    const textarea1 = ref('');
    const textarea2 = ref('456');
    const textarea3 = ref('456');

    return {
      textarea1,
      textarea2,
      textarea3,
    };
  },
});
</script>

<style lang="scss" scoped></style>
