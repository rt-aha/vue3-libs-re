<template>
  <div class="re-steps">
    <ul class="step-list">
      <li
        v-for="(c, idx) of config" :key="c.title" class="step-list__item"
        :class="[
          `step-list__item--${currentStatus(idx)}`,
        ]"
      >
        <div class="current">
          <p class="current__index">
            <img v-if="currentStatus(idx) === 'finish'" class="current__index__finish" src="@/assets/icon/confirm_green.svg">
            <img v-else-if="currentStatus(idx) === 'error'" class="current__index__error" src="@/assets/icon/exclamation_white.svg">
            <span v-else class="current__index__text">
              {{ idx + 1 }}
            </span>
          </p>
        </div>
        <div class="content">
          <div class="content__title">
            <p class="content__title__text">
              {{ c.title }}
            </p>
            <div class="content__title__deco-line" />
          </div>

          <div class="content__desc">
            <template v-if="c.render">
              <component :is="c.render" v-bind="c" />
            </template>
            <span v-else class="content__desc__text">
              {{ c.desc }}
            </span>
          </div>
        </div>
      </li>
      <ul />
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      current: '',
    }),
  },
  config: {
    type: Array,
    default: () => [],
  },
});

const currentStatus = (currIndex) => {
  const { type, index } = props.modelValue;

  if (currIndex === index) {
    return type;
  }

  if (currIndex < index) {
    return 'finish';
  }
};
</script>

<style lang="scss" scoped>
.re-steps {
    width: 100%;
  }
.step-list {
  width: 100%;
  @include flex(flex-start, flex-start);

  &__item {
    @include flex(flex-start, flex-start);
    flex: 1;

    &--current {
      .current {
        border-color: $c-deepblue;
        background-color: $c-deepblue;

        &__index {
          &__text {
            color: $c-white;
          }
        }
      }

      .content {
        &__title {
          color: $c-deepblue;

          &__deco-line {
            background-color: $c-deepblue;
          }
        }

        &__desc {
          color: $c-deepblue;
        }
      }
    }

    &--pending {
      .current {
        border-color: $c-brown;
        background-color: $c-brown;

        &__index {
          &__text {
            color: $c-white;
          }
        }
      }

      .content {
        &__title {
          color: $c-brown;

          &__deco-line {
            background-color: $c-brown;
          }
        }

        &__desc {
          color: $c-brown;
        }
      }
    }

    &--error {
      .current {
        border-color: $c-red;
        background-color: $c-red;

        &__index {
          &__text {
            color: $c-white;
          }
        }
      }

      .content {
        &__title {
          color: $c-red;

          &__deco-line {
            background-color: $c-red;
          }
        }

        &__desc {
          color: $c-red;
        }
      }
    }

    &--finish {
      .current {
        border-color: $c-green;
        &__index {
          &__text {
            color: $c-green;
          }
        }
      }

      .content {
        &__title {
          color: $c-green;

          &__deco-line {
            background-color: $c-green;
          }
        }

        &__desc {
          color: $c-green;
        }
      }
    }
  }
}

.current {
  @include circle(24px);
  position: relative;
  border: 1px solid $c-grey;
  flex: none;
  width: 24px;

  &__index {
    @include position(center);

    &__finish {
      width: 16px;
      position: relative;
      top: 1px;
      // @include font-style($c-green, 14);
    }

    &__error {
      // width: 100%;
      width: 20px;
      position: relative;
      top: 1px;
      // @include font-style($c-green, 14);
    }

    &__text {
      @include font-style($c-grey, 14);
    }
  }
}

.content {
  margin-left: 10px;
  width: 100%;

  &__title {
    margin-top: 2px;
    @include font-style($c-grey, 16, 500, normal);
    @include flex();
    width: 100%;

    &__text {
      flex: none;
    }

    &__deco-line {
      flex: 1;
      height: 1px;
      background-color: $c-grey;
      margin: 0 20px 0 10px;
    }
  }

  &__desc {
    margin-top: 5px;
    @include font-style($c-grey, 16, 400);
  }
}
</style>
