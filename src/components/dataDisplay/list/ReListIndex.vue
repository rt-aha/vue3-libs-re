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
        <ListHeader :columns="columns" />
        <ListContent :columns="columns" :content-data="contentData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ListHeader from '@/components/dataDisplay/list/ReListHeader.vue';
import ListContent from '@/components/dataDisplay/list/ReListContent.vue';

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
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
});

const listContentWidth = ref('');
const reListRef = ref(null);
const calcListWidth = () => {
  const wrapWidth = reListRef.value.clientWidth;

  const colFullWidth = props.columns
    .map(ele => ele.width || '100')
    .reduce((acc, ele) => {
      acc += Number(ele);
      return acc;
    }, 0);

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

// 更換 columns，可能會有不同欄位，需要重新計算寬度
watch(() => props.columns, () => {
  calcListWidth();
}, {
  deep: true,
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
