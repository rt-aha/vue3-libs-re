<template>
  <colgroup class="comp-table-col-group">
    <col v-for="col of columns" :key="col.key" :width="col.width">
  </colgroup>
</template>

<script>
export default {
  name: 'ReTableColGroup',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
