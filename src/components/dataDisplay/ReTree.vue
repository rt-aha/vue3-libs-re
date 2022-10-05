<template>
  <ul class="r-tree">
    <re-tree-item v-for="tree of config" :key="tree.label" :treeItem="tree" />
  </ul>
</template>

<script>

export default {
  name: 'ReTree',
  props: {
    config: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
