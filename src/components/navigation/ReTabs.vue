<template>
  <div class="re-tabs">
    <div class="re-tabs__select">
      <ul
        ref="ul" class="re-tabs__select__list"
        :class="{
          're-tabs__select__list--without-bottom-line': withoutBottomLine,
        }"
      >
        <li
          v-for="(tab, index) of tabsConfig"
          :key="tab.name"
          :ref="tab.name"
          class="re-tabs__select__list__item"
          :class="[
            {
              're-tabs__select__list__item--disabled': tab.disabled,
              're-tabs__select__list__item--active': modelValue === tab.name,
              're-tabs__select__list__item--full-width': fullWidth,
            },
          ]"
          :data-tab-name="tab.name"
          :data-tab-label="tab.label"
          @click="handleActive({ index, ...tab }, 'click')"
          @mouseenter="handleActive({ index, ...tab }, 'hover')"
        >
          <span>{{ tab.label }}</span>
        </li>
      </ul>
    </div>
    <div v-for="content of tabsConfig" :key="content.name" class="re-tabs__content">
      <!-- <Transition name="fade"> -->
      <div v-if="content.name === modelValue">
        <slot :name="content.name" />
      </div>
      <!-- </Transition> -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
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
  fullWidth: {
    type: Boolean,
    default: false,
  },
  withoutBottomLine: {
    type: Boolean,
    default: false,
  },
  trigger: {
    type: String,
    default: 'click',
  },
});

const emit = defineEmits('change');

const tabWidth = ref({});

const handleActive = (tab, triggerEvent) => {
  console.log('triggerEvent', triggerEvent);
  if (props.trigger === triggerEvent) {
    if (tab.disabled) { return; }
    emit('change', tab);
  }
};
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
      z-index: 500;
      display: inline-block;
      width: 10px;
      height: calc(100% - 1px);
      content: "";
    }

    &::after {
      @include position(tr, 0, 0);
      z-index: 500;
      display: inline-block;
      width: 10px;
      height: calc(100% - 1px);
      content: "";
    }

    &__list {
      @include flex();
      position: relative;
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;

      &::-webkit-scrollbar {
        height: 0;
      }

      &::after {
        @include position(tl, calc(100% - 1px), 0);
        display: inline-block;
        width: 100%;
        height: 1px;
        content: "";
        background-color: $c-grey;
      }

      &--without-bottom-line {
        &::after {
          height: 0;
          background-color: 0;
        }

        .re-tabs__select__list__item {
          @include padding(10px 0);
        }

        .re-tabs__select__list__item + .re-tabs__select__list__item {
          margin-left: 20px;
        }
      }

      &__item {
        @include padding(10px);
        @include flex(center);
        @include font-style($c-grey, 16);
        position: relative;
        // flex: 1;
        cursor: pointer;

        &--full-width {
          flex: 1;
        }

        &--active {
          position: relative;
          color: $c-deepblue;

          &::after {
            @include position(tl, calc(100% - 1px), 0);
            z-index: 500;
            display: inline-block;
            width: 100%;
            height: 1px;
            content: "";
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
