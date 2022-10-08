<template>
  <thead class="re-table-header">
    <tr class="header-tr">
      <td v-for="col of columns" :key="col.id || col.key" class="header-tr__td" :class="`header-tr__td--${col.type}`">
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
// .re-table-header {
//   &__content {
//     // width: 100%;
//     // border-top: 1px solid $c-assist2;
//   }
// }

.re-table-header {
  border-radius: 4px;
  overflow: auto;
}
.header-tr {
  // border-radius: 5px;
  background-color: $c-deepblue;

  &__td {
    @include padding(10px);
    @include font-style($c-white, 16, 400, 0.18px, 24px);
  }
}
</style>
