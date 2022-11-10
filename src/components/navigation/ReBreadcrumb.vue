<template>
  <div class="c-breadcrumb">
    <!-- {{ formatConfig }} -->
    <ul class="breadcrumb-list">
      <li v-for="(item, idx) of formatConfig" :key="item.key" class="breadcrumb-list__item" @click="() => handleClick(item)">
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
          v-show="formatConfig.length - 1 !== idx"
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
  formatConfig: {
    type: Function,
    default: args => args,
  },
});
const emit = defineEmits(['onClick']);

const formatConfig = computed(() => {
  const newConfig = [...props.config];
  return props.formatConfig(newConfig);
});

const handleClick = (item) => {
  emit('onClick', item);
};
</script>

<style lang="scss" scoped>
.c-breadcrumb {
  @include flex();
  @include max-width(1700);
  position: relative;
  z-index: 10;
  height: 40px;
}

.breadcrumb-list {
  @include flex();
  width: 100%;

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
      display: inline-block;
      width: 20px;
      margin: 0 10px;
    }
  }
}
</style>
