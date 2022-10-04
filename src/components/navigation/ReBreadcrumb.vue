<template>
  <div class="c-breadcrumb">
    <ul class="breadcrumb-list">
      <li class="breadcrumb-list__item" v-for="(item, idx) of config" :key="item.name" @click="() => handleClick(item)">
        <span class="breadcrumb-list__item__label">
          {{ item.label }}
        </span>

        <img
          class="breadcrumb-list__item__arrow"
          v-show="config.length - 1 !== idx"
          src="@/assets/icon/arrow_right.svg"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BreadCrumb',
  props: {
    config: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['onClick'],
  setup(_, { emit }) {
    // const route = useRoute();

    const handleClick = (item) => {
      emit('onClick', item);
    };

    return {
      handleClick,
    };
  },
});
</script>
<style lang="scss" scoped>
.c-breadcrumb {
  height: 40px;
  @include flex();
  // margin-top: 10px;
  @include max-width(1700);
  position: relative;
  z-index: 10;
}
.breadcrumb-list {
  width: 100%;
  @include flex();

  &__item {
    @include flex();
    // width: 50px;

    // flex: 1;

    &--hide {
      display: none;
    }

    &--extra {
      flex: 1;
    }

    &__label {
      @include font-style($c-black, 14);
      cursor: pointer;

      &--extra {
        @include word-ellipsis();
      }
    }

    &__arrow {
      width: 20px;
      display: inline-block;
      margin: 0 10px;
    }
  }
}
</style>
