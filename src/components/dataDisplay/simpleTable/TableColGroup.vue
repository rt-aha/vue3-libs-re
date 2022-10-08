<template>
  <colgroup class="comp-table-col-group">
    <col v-for="col of columnsConfig" :key="col.id" :width="col.width">
  </colgroup>
</template>

<script setup>
const props = defineProps({
  columnsConfig: {
    type: Array,
    default: () => [],
  },
});
</script>
