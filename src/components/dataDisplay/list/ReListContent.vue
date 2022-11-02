<template>
  <div class="re-list-content">
    <div class="re-list-content__content">
      <ul class="content-list">
        <li v-for="(data, idx1) of contentData" :key="data.key" class="content-list__item">
          <ListContentRow :columns="columns" :data="data" :idx1="idx1" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import ListContentRow from '@/components/dataDisplay/list/ReListContentRow.vue';

const props = defineProps({
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
});
</script>

<style lang="scss" scoped>
.re-list-content {
  &__content {
    margin-top: 0;

    &.g-content {
      padding: 20px 0;
    }

    &--margin-top {
      padding-top: 34px;
      margin-bottom: 60px;
    }

    // &--padding {
    //   padding: 0;
    // }

    &--max-100 {
      max-width: 100%;
    }
  }
}

.notice {
  @include font-style($c-black, 14, normal, 0.7px, 20px);
  @include padding(8px 0);
}

.content-list {
  &__item {
    height: 60px;
    margin-top: 10px;
    background-color: rgba($c-black, 0.03);
    border-radius: 5px;
  }
}
</style>
