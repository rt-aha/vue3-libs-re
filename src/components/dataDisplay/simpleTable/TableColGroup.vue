<template>
  <colgroup class="comp-table-col-group">
    <col v-for="col of columnsConfig" :key="col.id" :width="col.width">
  </colgroup>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SimpleTableColGroup',
  props: {
    columnsConfig: {
      type: Array,
      default: () => [],
    },
  },

});
</script>
