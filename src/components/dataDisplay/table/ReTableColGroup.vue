<template>
  <colgroup class="comp-table-col-group">
    <col v-for="col of columns" :key="col.key" :width="col.width">
  </colgroup>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
});
</script>
