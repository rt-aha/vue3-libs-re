<template>
  <div class="timeline">
    <div class="timeline__content">
      <div v-for="d of config" :key="d.title" class="time-block" :data="d">
        <div class="time-block__title">
          <!-- <div class="time-block__title__dot" /> -->
          <div class="time-block__title__text">
            {{ d.title }}
          </div>
        </div>
        <div ref="descBlock" class="time-block__desc">
          <div class="time-block__desc__line" />

          <div ref="timeBlock" class="time-block__desc__text">
            <template v-if="d.render">
              <component :is="d.render" v-bind="$attrs" :d="data" />
            </template>
            <template v-else>
              <p>{{ d.text }}</p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  config: {
    type: Array,
    default: () => [],
  },
  reverse: {
    type: Boolean,
    default: false,
  },
});

const innerTimelineData = computed(() => {
  if (props.reverse) {
    return cloneDeep(props.config).reverse();
  }

  return cloneDeep(props.config);
});
</script>

<style lang="scss" scoped>
@import "@/styles/utils/_rwd";

.timeline {
  &__content {
    position: relative;

    // &::before {
    //   content: "";
    //   border-left: solid 1px $c-grey;
    //   height: calc(100% - 100px);
    //   display: inline-block;
    //   @include position(tl, 35px, 5px);
    // }
  }
}

.time-block {
  & + & {
    margin-top: 20px;
  }

  &__title {
    @include flex();
    position: relative;
    z-index: 10;

    &__text {
      @include font-style($c-deepblue, 20, 700, 0.4px);
      position: relative;
      margin-left: 20px;

      &::before {
        @include circle(10px);
        @include position(tl, 50%, -20px);
        margin-right: 10px;
        content: "";
        background-color: $c-deepblue;
        transform: translateY(-50%);
      }
    }
  }

  &__desc {
    height: 100%;
    margin-top: 4px;

    &__line {
    }

    &__text {
      position: relative;
      height: 100%;
      margin-left: 20px;

      &::before {
        @include position(tl, 0, -16px);
        display: inline-block;
        width: 1px;
        height: 100%;
        content: "";
        background-color: $c-grey;
      }
    }
  }
}
</style>
