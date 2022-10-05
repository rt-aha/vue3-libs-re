<template>
  <ul class="r-tree">
    <re-tree-item v-for="tree of config" :key="tree.label" :tree-item="tree" />
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
