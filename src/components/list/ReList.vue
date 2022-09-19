<template>
  <div class="re-list" ref="reListRef">
    <!-- overflow:hidden 包 flex 的內容會失效，所以要多夾一層 -->
    <div class="re-list__wrap">
      <div
        class="re-list__wrap__content"
        :style="{
          width: listContentWidth,
        }"
      >
        <list-header :columns="config.columns" />
        <list-content :columns="config.columns" :contentData="contentData" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import ListHeader from '@/components/list/ListHeader.vue';
import ListContent from '@/components/list/ListContent.vue';

export default defineComponent({
  name: 'MyMuiscList',
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
      console.log('reListRef.value', reListRef.value);
      console.log('reTableRef', reListRef.value.clientWidth);
      const wrapWidth = reListRef.value.clientWidth;

      const colFullWidth = props.config.columns
        .map((ele) => ele.width || '100')
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
      listContentWidth.value = `100%`;
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
