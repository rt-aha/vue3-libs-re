<template>
  <div class="list-content-row">
    <ul class="content-row">
      <li
        v-for="(col, idx2) of columns"
        :key="col.id || col.key"
        class="content-row__item"
        :style="{ 'flex': col.width ? 'none' : '1', 'width': `${col.width}px`, 'text-align': col.align }"
      >
        <div class="content-row__item__cell" :class="[{ 'content-row__item__cell--padding-left': idx2 === 0 }]">
          <template v-if="col.render">
            <component :is="col.render" v-bind="{ data, column: col, idx: idx1 }" />
            <!-- :key="nanoid()" -->
          </template>
          <template v-else>
            <span class="content-row__item__text">{{ data[col.key] }}</span>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  columns: {
    type: Object,
    default: () => ({}),
  },
  idx1: {
    type: Number,
  },
});
</script>

<style lang="scss" scoped>
.list-content-row {
  // border-radius: 5px;
  height: 100%;
}

.content-row {
  @include flex();
  @include padding(0 10px);
  // width: 100%;
  // height: 52px;
  height: 100%;
  cursor: pointer;

  &__item {
    @include flex();
    @include padding(7px 10px);

    &__text {
      @include font-style($c-black, 14, normal, 0.2px, 27px);
    }

    &__cell {
      width: 100%;

      &--padding-left {
        width: 100%;
        margin-left: 0;
      }
    }

    &__checkbox {
      @include flex(center);
      width: 100%;
    }
  }
}
</style>
