<template>
  <li class="re-tree-item">
    <div class="re-tree-item__content" @click="toggleExpand">
      <div
        class="re-tree-item__content__arrow"
        :class="isExpand && `re-tree-item__content__arrow--active`"
      >
        <div v-if="treeItem.children" class="re-tree-item__content__arrow__icon" />
      </div>
      <div class="re-tree-item__content__label">
        <span>{{ treeItem.label }}</span>
      </div>
    </div>
    <ReCollapseTransition :show="isExpand" :border="false">
      <div class="re-tree-item__children">
        <re-tree :config="treeItem.children" />
      </div>
    </ReCollapseTransition>
  </li>
</template>

<script setup>
import ReCollapseTransition from '@/components/utility/ReCollapseTransition.vue';

const props = defineProps({
  treeItem: {
    type: Object,
    default: () => ({}),
  },
});

const isExpand = ref(false);

const toggleExpand = () => {
  isExpand.value = !isExpand.value;
};
</script>

<style lang="scss" scoped>
.re-tree-item {
  margin-top: 10px;
  cursor: pointer;

  &__children {
    @include padding(0 0 0 14px);
  }

  &__content {
    @include font-style($c-black, 14px);
    position: relative;
    @include flex();

    &__arrow {
      /* position: absolute; */
      /* bottom: 0;
    left: 0; */
      width: 20px;
      height: 20px;
      transition: 0.3s;
      transform: rotate(90deg);

      &__icon {
        @include position(center);

        &::before,
        &::after {
          content: "";
          width: 6px;
          height: 2px;
          border-radius: 1px;
          background-color: $c-black;
          display: inline-block;
          position: absolute;
          top: 50%;

          transform: translateY(-50%);
          // transform-origin: 50% 50%;
        }

        &::before {
          transform: rotate(45deg) translateY(-50%);
          left: -2px;
        }

        &::after {
          transform: rotate(-45deg) translateY(-50%);
          right: -2px;
        }
      }

      &--active {
        transform: rotate(180deg);
      }
    }

  }
}
</style>
