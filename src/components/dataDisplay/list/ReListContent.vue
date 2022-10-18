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
    // border-radius: 5px;

    /* border-bottom: 1px solid $c-grey; */
    height: 70px;
    // background-color: $c-white;
    box-shadow: 3px 3px 6px rgba($c-black, 0.1);

    & + & {
      margin-top: 10px;
    }
  }
}
</style>
