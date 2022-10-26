<template>
  <div
    class="timeline"
    :class="{
      'timeline--horizontal': horizontal,
    }"
  >
    <div class="timeline__content">
      <div v-for="d of config" :key="d.title" class="time-block" :data="d">
        <div class="time-block__title">
          <!-- <div class="time-block__title__dot" /> -->
          <div v-if="!horizontal" class="time-block__title__text">
            {{ d.title }}
          </div>
          <div class="time-block__title__circle" />
          <div class="time-block__title__line" />
        </div>
        <div ref="descBlock" class="time-block__desc">
          <div class="time-block__desc__line" />

          <div ref="timeBlock" class="time-block__desc__text">
            <p v-if="horizontal" class="time-block__vertical-title">
              {{ d.title }}
            </p>
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
  horizontal: {
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
  &--horizontal {
    .time-block + .time-block {
      margin-top: 0;
      margin-left: 10px;
    }

    .timeline {
      &__content {
        @include flex(flex-start, flex-start);
      }
    }

    .time-block {
      &__title {
        @include flex();
        // position: relative;

        // &::after {
        //   @include position(tr, 50%, 0);
        //   display: inline-block;
        //   width: 100%;
        //   height: 1px;
        //   content: "";
        //   background-color: $c-grey;
        //   transform: translateY(-50%);
        // }

        &__text {
          // @include font-style($c-deepblue, 18, 700, 0.4px);
          // @include circle(10px);
          display: none;
        }

        &__circle {
          @include circle(10px);
          flex: none;
          background-color: $c-deepblue;
        }

        &__line {
          flex: 1;
          width: 100%;
          height: 1px;
          margin-left: 10px;
          background-color: $c-grey;
        }
      }

      &__desc {
        &__text {
          margin: 0;

          &::before {
            display: none;
            width: 0;
          }
        }
      }

      &__vertical-title {
        @include font-style($c-deepblue, 18, 700, 0.4px);
        margin-bottom: 5px;
      }
    }
  }

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
      @include font-style($c-deepblue, 18, 700, 0.4px);
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
