<template>
  <div class="v-input-list">
    <dev-section title="基本使用">
      <ReInputList v-model="value" />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReInputList from '@/components/dataInput/ReInputList.vue';

export default defineComponent({
  name: 'ViewInputList',
  components: {
    ReInputList,
  },
  setup() {
    const value = ref([]);

    return {
      value,
    };
  },
});
</script>

<style lang="scss" scoped></style>
