<template>
  <div class="v-tree">
    <dev-section title="基本使用">
      <ReTree :config="treeList" />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReTree from '@/components/dataDisplay/ReTree.vue';
import { treeList } from '@/config/treeConfig';

export default defineComponent({
  name: 'ViewTree',
  components: {
    ReTree,
  },
  setup() {
    return {
      treeList,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
