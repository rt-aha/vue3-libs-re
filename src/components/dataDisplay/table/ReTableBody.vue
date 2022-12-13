<template>
  <tbody class="re-table-body">
    <tr v-for="(data, idx1) of contentData" :key="data.key" class="re-table-body__tr">
      <td v-for="col of columns" :key="col.id || col.key" class="re-table-body__tr__td">
        <!-- <list-content-row :columns="columns" :data="data" :idx1="idx1" /> -->

        <div class="cell">
          <template v-if="col.render">
            <component :is="col.render" v-bind="{ data, column: col, idx: idx1 }" />
          </template>
          <template v-else>
            <span class="cell__text">{{ data[col.key] || '' }}</span>
          </template>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  contentData: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.re-table-body {
  &__tr {
    height: 70px;
    border-bottom: 1px solid #ccc;

    & + & {
    }

    &__td {
      height: 100%;
      vertical-align: middle;
    }
  }
}

.cell {
  @include padding(10px);
  height: 100%;
  // @include flex(fle);
  &__text {
    @include font-style($c-black, 14, normal, 0.7px, 20px);
  }
}
</style>
