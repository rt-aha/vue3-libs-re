<template>
  <div class="v-tree">
    Tree 施工中 ...
    <dev-section title="基本使用">
      <re-tree :config="treeList" />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReTree from '@/components/dataDisplay/ReTree.vue';
import { treeList } from '@/config/treeConfig'

export default defineComponent({
  name: 'ViewTree',
  components:{
    ReTree
  },
  setup() {
    return {
      treeList
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
