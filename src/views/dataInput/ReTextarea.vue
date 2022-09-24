<template>
  <div class="v-re-textarea">
    <dev-section title="基本使用">
      <div>
        <re-textarea v-model="textarea1" />
      </div>
    </dev-section>

    <dev-section title="限制字數提醒、行數設定">
      <div>
        <re-textarea v-model="textarea2" textLimit="5" rows="5" />
      </div>
    </dev-section>

    <dev-section title="resize">
      <re-textarea v-model="textarea3" autosize="none" />
      <re-textarea v-model="textarea3" autosize="vertical" />
      <re-textarea v-model="textarea3" autosize="horizontal" />
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
