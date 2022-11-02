<template>
  <div class="re-header">
    <div class="re-header__content">
      <ul class="header-list">
        <li
          v-for="col of columns"
          :key="col.id || col.key"
          class="header-list__item"
          :class="`header-list__item--${col.type}`"
          :style="{ 'flex': col.width ? 'none' : '1', 'width': `${col.width}px`, 'text-align': col.headerAlign || col.align }"
        >
          <template v-if="col.renderHeader">
            <component :is="col.renderHeader" v-bind="{ data, column: col, idx: idx1 }" />
          </template>
          <template v-else>
            {{ col.label }}
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.re-header {
  // background-color: $c-white;

  /* box-shadow: 3px 3px 6px rgba($c-black, 0.1); */

  &--search {
    background-color: transparent;
    box-shadow: 0 0 0 transparent;
  }

  &__content {
    width: 100%;
    // border-top: 1px solid $c-assist2;
  }
}

.header-list {
  // width: 100%;
  @include flex(flex-start);
  @include padding(0 10px);
  background-color: rgba($c-black, 0.2);
  border-radius: 5px;
  // box-shadow: 3px 3px 6px rgba($c-black, 0.1);

  &__item {
    @include font-style($c-black, 14, 400, 1px, 24px);
    @include padding(7px 10px);
  }
}

.center {
  @include flex(center);
}
</style>
