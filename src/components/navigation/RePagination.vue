<template>
  <div class="re-pagination">
    <div class="re-pagination__content">
      <ul v-if="pager.totalPage !== 1" class="re-pager-list">
        <li
          v-show="pager.pageIndex !== 1 || pager.totalPage === 1"
          v-if="showFirstLast"
          class="re-pager-list__item"
          @click="handlePageIndex('first')"
        >
          <img class="re-pager-list__item__indicator-icon" src="@/assets/icon/pager_first.svg">
        </li>

        <li
          v-show="pager.pageIndex !== 1 || pager.totalPage === 1"
          v-if="showPrevNext || showFirstLast"
          class="re-pager-list__item re-pager-list__item--prev"
          @click="handlePageIndex('prev')"
        >
          <img class="re-pager-list__item__indicator-icon" src="@/assets/icon/pager_prev.svg">
        </li>

        <li
          v-for="(item, index) of renderPage"
          :key="index"
          class="re-pager-list__item re-pager-list__item--number"
          @click="handlePageIndex('jump', item)"
        >
          <span
            class="re-pager-list__item__page-number"
            :class="[
              { 're-pager-list__item__page-number--more-sign': typeof item !== 'number' },
              { 're-pager-list__item__page-number--active': isActive(item) },
              { 're-pager-list__item__page-number--active--white': isActive(item, 'white') },
            ]"
          >{{ item }}</span>
        </li>

        <li
          v-show="pager.pageIndex !== pager.totalPage && pager.totalPage > 1"
          v-if="showPrevNext || showFirstLast"
          class="re-pager-list__item re-pager-list__item--next"
          @click="handlePageIndex('next')"
        >
          <img class="re-pager-list__item__indicator-icon" src="@/assets/icon/pager_next.svg">
        </li>

        <li
          v-show="pager.pageIndex !== pager.totalPage && pager.totalPage > 1"
          v-if="showFirstLast"
          class="re-pager-list__item"
          @click="handlePageIndex('last')"
        >
          <img class="re-pager-list__item__indicator-icon" src="@/assets/icon/pager_last.svg">
        </li>
      </ul>

      <div v-if="pageSizeOptions && pageSizeOptions.length > 0" class="page-size">
        <ReSelect v-model="pageSize" :options="pageSizeOptions" @onChange="handlePageSize" />
      </div>
      <div v-if="showPageJump" class="page-jump">
        <ReInput v-model="pageJump" input-type="number" @onChange="handlePageJump" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import ReSelect from '@/components/dataInput/ReSelect.vue';
import ReInput from '@/components/dataInput/ReInput.vue';

export default defineComponent({
  name: 'RePagination',
  components: {
    ReSelect,
    ReInput,
  },
  props: {
    size: {
      type: String,
      default: 'default',
      validator: val => ['small', 'default'].includes(val),
    },
    pager: {
      type: Object,
      default: () => ({}),
    },
    activeColor: {
      type: String,
      default: 'black',
    },
    showPrevNext: {
      type: Boolean,
      default: false,
    },

    showFirstLast: {
      type: Boolean,
      default: false,
    },
    showPageJump: {
      type: Boolean,
      default: false,
    },
    pageSizeOptions: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['handlePageIndex', 'handlePageSize', 'handlePageJump'],
  setup(props, { emit }) {
    const pageSize = ref(null);
    const pageJump = ref('1');
    const firstPage = ref(1);
    const route = useRoute();

    const renderPage = computed(() => {
      const { pageIndex: pi, totalPage: tp } = props.pager;
      const pageIndex = Number(pi);
      const totalPage = Number(tp);

      // 如果小於6 直接返回
      if (totalPage <= 6) {
        const pageList = [];
        for (let i = 1; i <= totalPage; i += 1) {
          pageList.push(i);
        }
        return pageList;
      }

      let pageList = [
        // pageIndex - 2,
        pageIndex - 1,
        pageIndex,
        pageIndex + 1,
        // pageIndex + 2,
      ];

      pageList = pageList.filter(ele => ele >= firstPage.value && ele <= totalPage);

      // 補1
      if (pageIndex - 1 - firstPage.value === 1) {
        pageList.splice(0, 0, 1);
      }

      // 補... 和 1
      if (pageIndex - 1 - firstPage.value > 1) {
        pageList.splice(0, 0, '⋯');
        pageList.splice(0, 0, 1);
      }

      // 補最大頁數
      if (totalPage - (pageIndex + 1) >= 1) {
        pageList.push(totalPage);
      }

      // 補最大頁數...
      if (totalPage - (pageIndex + 1) > 1) {
        pageList.splice(-1, 0, '⋯');
      }

      return pageList;
    });

    const handlePageIndex = (operate, page) => {
      // 唯一的string是刪節號，直接返回
      if (typeof page === 'string') {
        return;
      }

      let targetPage = 0;

      if (operate === 'first') {
        targetPage = 1;
      }

      if (operate === 'prev') {
        targetPage = props.pager.pageIndex - 1;
      }

      if (operate === 'next') {
        targetPage = props.pager.pageIndex + 1;
      }

      if (operate === 'last') {
        targetPage = props.pager.totalPage;
      }

      if (operate === 'jump') {
        targetPage = page;
      }

      emit('handlePageIndex', targetPage);
    };

    const handlePageJump = (val, event) => {
      if (event === 'keydown.enter') {
        let target = val;
        if (val > props.pager.totalPage) {
          target = props.pager.totalPage;
        }

        if (val < 0 || val.includes('-')) {
          target = 1;
        }

        pageJump.value = String(target);
        emit('handlePageJump', target);
      }
    };

    const handlePageSize = (target) => {
      emit('handlePageSize', target);
    };

    const isActive = (pageNumber, isWhite) => {
      const condition
        = Number(props.pager.pageIndex) === Number(pageNumber) || Number(route.query.pageIndex) === Number(pageNumber);

      if (isWhite) {
        return condition && props.activeColor === 'white';
      }

      return condition;
    };

    return {
      firstPage,
      renderPage,
      route,
      isActive,
      handlePageIndex,
      handlePageJump,
      handlePageSize,
      pageSize,
      pageJump,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-pagination {
  text-align: center;

  &__content {
    @include flex();
  }
}

.re-pager-list {
  display: inline-flex;

  &__item {
    @include flex(center);
    width: 20px;
    position: relative;
    cursor: pointer;

    &--number {
      & + & {
        margin-left: 10px;
      }
    }

    &--next {
      margin-left: 10px;
    }

    &--prev {
      margin-right: 10px;
    }

    &__indicator-icon {
      width: 100%;
    }

    &__page-number {
      @include font-style($c-grey, 16, 600, 0.8px, 26px);
      position: relative;

      &--active {
        transition: 0.3s;
        color: $c-black;

        &--white {
          color: $c-white;
        }
      }
    }
  }
}

.page-size {
  margin-left: 16px;
  flex: none;
  width: 100px;
}

.page-jump {
  margin-left: 16px;
  flex: none;
  width: 50px;
}
</style>
