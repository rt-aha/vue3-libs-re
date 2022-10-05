<template>
  <div ref="reListRef" class="re-list">
    <!-- overflow:hidden 包 flex 的內容會失效，所以要多夾一層 -->
    <div class="re-list__wrap">
      <div
        class="re-list__wrap__content"
        :style="{
          width: listContentWidth,
        }"
      >
        <ListHeader :columns="config.columns" />
        <ListContent :columns="config.columns" :content-data="contentData" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import ListHeader from '@/components/dataDisplay/list/ReListHeader.vue';
import ListContent from '@/components/dataDisplay/list/ReListContent.vue';

export default defineComponent({
  name: 'ReListIndex',
  components: {
    ListHeader,
    ListContent,
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
    const listContentWidth = ref('');
    const reListRef = ref(null);
    const calcListWidth = () => {
      const wrapWidth = reListRef.value.clientWidth;

      const colFullWidth = props.config.columns
        .map(ele => ele.width || '100')
        .reduce((acc, ele) => {
          acc += Number(ele);
          return acc;
        }, 0);

      console.log('colFullWidth', colFullWidth);

      if (colFullWidth > wrapWidth) {
        listContentWidth.value = `${colFullWidth}px`;
        return;
      }

      listContentWidth.value = `${wrapWidth}px`;
      listContentWidth.value = '100%';
    };

    onMounted(() => {
      calcListWidth();
    });

    return {
      listContentWidth,
      reListRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-list {
  width: 100%;
  // width: 300px;
  // height: 30px;
  overflow: hidden;

  &__wrap {
    width: 100%;
    overflow: auto;

    &__content {
    }
  }
}

.re-list-wrap {
}
</style>
