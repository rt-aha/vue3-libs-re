<template>
  <tbody class="re-table-body">
    <tr class="re-table-body__tr" v-for="(data, idx1) of contentData" :key="data.key">
      <td class="re-table-body__tr__td" v-for="col of columns" :key="col.id || col.key">
        <!-- <list-content-row :columns="columns" :data="data" :idx1="idx1" /> -->

        <div class="cell">
          <template v-if="col.render">
            <component :is="col.render" v-bind="{ data, column: col, idx: idx1, expandStatus }" />
          </template>
          <template v-else>
            <span class="cell__text">{{ data[col.key] || '' }}</span>
          </template>
        </div>
      </td>
    </tr>
  </tbody>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ReTableBody',
  components: {},
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    contentData: {
      type: Array,
      default: () => [],
    },
    onExpand: {},

    // albumsInfo, playlistsInfo 使用
    padding: {
      type: Boolean,
      default: true,
    },
    max100: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
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
  height: 100%;
  @include padding(10px);
  // @include flex(fle);
  &__text {
  }
}
</style>
