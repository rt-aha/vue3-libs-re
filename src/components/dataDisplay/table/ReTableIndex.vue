<template>
  <div ref="reTableRef" class="re-table">
    <div class="re-table__content">
      <table
        class="table"
        :style="{
          width: tableContentWidth,
        }"
      >
        <ReTableColGroup :columns="config.columns" />
        <ReTableHeader :columns="config.columns" />
        <ReTableBody :columns="config.columns" :content-data="contentData" />
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import ReTableColGroup from '@/components/dataDisplay/table/ReTableColGroup.vue';
import ReTableHeader from '@/components/dataDisplay/table/ReTableHeader.vue';
import ReTableBody from '@/components/dataDisplay/table/ReTableBody.vue';

export default defineComponent({
  name: 'ReTableIndex',
  components: {
    ReTableColGroup,
    ReTableHeader,
    ReTableBody,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    contentData: {
      type: Array,
      default: () => [],
    },
    notice: {
      type: String,
      default: '',
    },
    padding: {
      type: Boolean,
      default: true,
    },
    max100: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    gContent: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const tableContentWidth = ref('');
    const reTableRef = ref(null);
    const calcTableWidth = () => {
      const wrapWidth = reTableRef.value.clientWidth;

      const colFullWidth = props.config.columns
        .map(ele => ele.width || '150')
        .reduce((acc, ele) => {
          acc += Number(ele);
          return acc;
        }, 0);

      if (colFullWidth > wrapWidth) {
        tableContentWidth.value = `${colFullWidth}px`;
        return;
      }

      tableContentWidth.value = '100%';
    };

    onMounted(() => {
      calcTableWidth();
    });

    return {
      tableContentWidth,
      reTableRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-table {
  width: 100%;
  overflow: hidden;

  &__content {
    overflow-x: auto;
  }
}
</style>
