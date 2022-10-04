<template>
  <div class="c-breadcrumb">
    <ul class="breadcrumb-list">
      <li v-for="(item, idx) of config" :key="item.name" class="breadcrumb-list__item" @click="() => handleClick(item)">
        <template v-if="item.render">
          <component :is="item.render" v-bind="item" />
        </template>
        <span
          v-else
          class="breadcrumb-list__item__label"
          :class="{
            'breadcrumb-list__item__label--clarify': clarify && config.length - 1 > idx,
          }"
        >
          {{ item.label }}
        </span>

        <img
          v-show="config.length - 1 !== idx"
          class="breadcrumb-list__item__arrow"
          src="@/assets/icon/arrow_right.svg"
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  config: {
    type: Array,
    default: () => [],
  },
  clarify: {
    type: Boolean,
    dafault: false,
  },
});
const emit = defineEmits(['onClick']);

const handleClick = (item) => {
  emit('onClick', item);
};
</script>

<style lang="scss" scoped>
.c-breadcrumb {
  height: 40px;
  @include flex();
  @include max-width(1700);
  position: relative;
  z-index: 10;
}
.breadcrumb-list {
  width: 100%;
  @include flex();

  &__item {
    @include flex();

    &__label {
      @include font-style($c-black, 14);
      cursor: pointer;

      &--clarify {
        opacity: 0.5;
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
