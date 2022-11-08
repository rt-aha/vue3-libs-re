<template>
  <thead class="re-table-header">
    <tr class="header-tr">
      <td
        v-for="col of columns"
        :key="col.id || col.key"
        class="header-tr__td"
      >
        <template v-if="col.renderHeader">
          <component :is="col.renderHeader" v-bind="{ data, column: col, idx: idx1 }" />
        </template>
        <template v-else>
          {{ col.label }}
        </template>
      </td>
    </tr>
  </thead>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.re-table-header {
  // overflow: auto;
  border-radius: 4px;
}

.header-tr {
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;

  &__td {
    @include padding(10px);
    @include font-style($c-black, 14, 400, 1px, 24px);
  }
}
</style>
