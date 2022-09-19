<template>
  <div class="re-table" ref="reTableRef">
    <div class="re-table__content">
      <table
        class="table"
        :style="{
          width: tableContentWidth,
        }"
      >
        <ReTableColGroup :columns="config.columns" />
        <ReTableHeader :columns="config.columns" />
        <ReTableBody :columns="config.columns" :contentData="contentData" />
      </table>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import ReTableHeader from '@/components/table/ReTableHeader.vue';
import ReTableBody from '@/components/table/ReTableBody.vue';
import ReTableColGroup from '@/components/table/ReTableColGroup.vue';

export default defineComponent({
  name: 'ReTable',
  components: {
    ReTableHeader,
    ReTableBody,
    ReTableColGroup,
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
      console.log('reTableRef', reTableRef.value.clientWidth);
      const wrapWidth = reTableRef.value.clientWidth;

      const colFullWidth = props.config.columns
        .map((ele) => ele.width || '150')
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
