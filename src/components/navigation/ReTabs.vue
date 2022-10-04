<template>
  <div class="re-tabs">
    <div class="re-tabs__select">
      <ul class="re-tabs__select__list" ref="ul">
        <li
          class="re-tabs__select__list__item"
          :class="[
            {
              're-tabs__select__list__item--disabled': tab.disabled,
              're-tabs__select__list__item--active': modelValue === tab.name,
            },
          ]"
          v-for="(tab, index) of tabsConfig"
          :key="tab.name"
          :ref="tab.name"
          :data-tab-name="tab.name"
          :data-tab-label="tab.label"
          @click="handleClick({ index, ...tab })"
        >
          <span>{{ tab.label }}</span>
        </li>
      </ul>
    </div>
    <div class="re-tabs__content" v-for="content of tabsConfig" :key="content.name">
      <!-- <Transition name="fade"> -->
      <div v-if="content.name === modelValue">
        <slot :name="content.name"></slot>
      </div>
      <!-- </Transition> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ReTabs',

  props: {
    modelValue: {
      type: String,
      defualt: '',
    },
    tabsConfig: {
      type: Array,
      default: () => [],
    },
    currTab: {
      default: '',
    },
  },
  setup(props, { emit }) {
    const tabWidth = ref({});

    const handleClick = (tab) => {
      if (tab.disabled) return;
      emit('change', tab);
    };

    return {
      tabWidth,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-tabs {
  position: relative;
  width: 100%;

  &__select {
    position: relative;
    width: 100%;

    &::before {
      @include position(tl, 0, 0);
      content: '';
      display: inline-block;
      z-index: 500;
      width: 10px;
      height: calc(100% - 1px);
      background: linear-gradient(90deg, $c-white 0%, transparent 90%, transparent 100%);
    }

    &::after {
      @include position(tr, 0, 0);
      content: '';
      display: inline-block;
      z-index: 500;
      width: 10px;
      height: calc(100% - 1px);
      background: linear-gradient(270deg, $c-white 0%, transparent 90%, transparent 100%);
    }

    &__list {
      position: relative;
      width: 100%;
      white-space: nowrap;
      overflow-x: auto;
      @include flex();

      &::-webkit-scrollbar {
        height: 0;
      }

      &::after {
        @include position(tl, calc(100% - 1px), 0);
        content: '';
        display: inline-block;
        width: 100%;
        height: 1px;
        background: $c-grey;
      }

      &__item {
        @include padding(10px 0 20px);
        display: inline-block;
        position: relative;
        cursor: pointer;
        flex: 1;
        @include flex(center);
        @include font-style($c-grey, 18);

        &::after {
          @include position(tl, calc(100% - 2px), 0);
          content: '';
          display: inline-block;
          width: 100%;
          height: 2px;
          background-color: $c-grey;
        }

        &--active {
          position: relative;
          color: $c-deepblue;

          &::after {
            display: inline-block;
            z-index: 300;
            background-color: $c-deepblue;
          }
        }

        &--disabled {
          cursor: not-allowed;
          background-color: transparent;
        }
      }
    }
  }

  &__content {
    margin-top: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
