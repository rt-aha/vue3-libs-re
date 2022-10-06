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
@import "@/styles/utils/_rwd.scss";
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
      margin-left: 20px;
      @include font-style($c-deepblue, 20, 700, 0.4px);
      position: relative;

      &::before {
        content: '';
        background-color: $c-deepblue;
        margin-right: 10px;
        @include circle(10px);
        @include position(tl, 50%, -20px);
        transform: translateY(-50%);
      }

    }
  }

  &__desc {
    margin-top: 4px;
    height: 100%;

    &__line {
    }

    &__text {
      margin-left: 20px;
      height: 100%;
      position: relative;

      &::before {
        content: "";
        width: 1px;
        height: 100%;
        display: inline-block;
        background-color: $c-grey;;
        @include position(tl, 0px, -16px);
      }
    }
  }
}
</style>
