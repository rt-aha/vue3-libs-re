<template>
  <div class="c-link-list">
    <ul class="link-list">
      <li v-for="item of list" :key="item.link" class="link-list__item">
        <LinkItem :label="item.label" :link="item.link" />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import LinkItem from '@/forDev/testComponents/LinkItem.vue';

export default defineComponent({
  name: 'DownloadList',
  components: {
    LinkItem,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<style lang="scss" scoped>
.link-list {
  &__item {
    & + & {
      margin-top: 20px;
    }
  }
}
</style>
