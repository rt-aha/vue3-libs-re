<template>
  <div class="v-pagination">
    <dev-section title="基本使用">
      <RePagination :pager="pager" @handlePageIndex="handlePageIndex" />
    </dev-section>

    <dev-section title="前一頁、下一頁">
      <RePagination :pager="pager" show-prev-next @handlePageIndex="handlePageIndex" />
    </dev-section>

    <dev-section title="第一頁、最後頁">
      <!-- 有 fisrtLast 就會預設有 prevNext -->
      <RePagination :pager="pager" show-first-last @handlePageIndex="handlePageIndex" />
    </dev-section>

    <dev-section title="跳頁">
      <RePagination
        :pager="pager"
        show-prev-next
        show-page-jump
        @handlePageIndex="handlePageIndex"
        @handlePageJump="handlePageJump"
      />
    </dev-section>

    <dev-section title="每頁顯示筆數">
      <RePagination
        :pager="pager"
        :page-size-options="pageSizeOptions"
        show-prev-next
        @handlePageIndex="handlePageIndex"
        @handlePageSize="handlePageSize"
      />
    </dev-section>

    <dev-section title="所有功能">
      <RePagination
        :pager="pager"
        :page-size-options="pageSizeOptions"
        show-first-last
        show-page-jump
        @handlePageIndex="handlePageIndex"
        @handlePageSize="handlePageSize"
        @handlePageJump="handlePageJump"
      />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import RePagination from '@/components/navigation/RePagination.vue';

export default defineComponent({
  name: 'ViewPagination',
  components: {
    RePagination,
  },
  setup() {
    const pager = reactive({
      pageIndex: 2,
      totalPage: 10,
      pageSize: 10,
    });

    const handlePageIndex = (target) => {
      console.log('page index...', target);
      pager.pageIndex = target;
    };

    const handlePageSize = (opt) => {
      console.log('page size...', opt.value);
      pager.pageSize = opt.value;
    };

    const handlePageJump = (target) => {
      console.log('page jump index...', target);
      pager.pageIndex = target;
    };

    const pageSizeOptions = [
      {
        label: '10筆',
        value: 10,
      },
      {
        label: '20筆',
        value: 20,
      },
      {
        label: '50筆',
        value: 50,
      },
    ];

    return {
      pager,
      handlePageIndex,
      pageSizeOptions,
      handlePageSize,
      handlePageJump,
    };
  },
});
</script>

<style lang="scss" scoped></style>
