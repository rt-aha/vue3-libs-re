<template>
  <div class="re-dropdown">
    <div class="dropdown" @click.stop="toggleExpand" v-click-away="closeSelect">
      <div class="dropdown__active-wrap">
        <p class="dropdown__feild">{{ innerSingle }}</p>
      </div>
    </div>
    <!-- @click="toggleExpand" -->
    <div class="dropdown-options-wrap" :class="[`dropdown-options-wrap--align--${align}`]">
      <ReCollapseTransition :show="isExpand">
        <div class="dropdown-options">
          <ul class="dropdown-option-list">
            <li
              class="dropdown-option-list__item"
              :class="{
                'dropdown-option-list__item--disabled': opt.disabled,
                'dropdown-option-list__item--active': isActive(opt),
              }"
              v-for="opt of options"
              :key="opt.value"
              @click="() => handleOption(opt)"
            >
              <p class="dropdown-option-list__item__component" v-if="opt.render">
                <component :is="opt.render" v-bind="opt" />
              </p>
              <p class="dropdown-option-list__item__label" v-else>
                {{ opt.label }}
              </p>
            </li>
          </ul>
        </div>
      </ReCollapseTransition>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch, nextTick } from 'vue';
import ReCollapseTransition from '@/components/utility/ReCollapseTransition.vue';
import useValidate from '@/hooks/useValidate';

export default defineComponent({
  name: 'ReDropdown',
  components: {
    ReCollapseTransition,
  },
  props: {
    modelValue: {
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    align: {
      type: String,
      default: 'center',
    },
  },
  emits: ['update:modelValue', 'onChange'],
  setup(props, { emit }) {
    const innerSingle = ref('');
    const { validFn } = useValidate();
    const isExpand = ref(false);

    const setInitValue = () => {
      innerSingle.value = props.modelValue;
    };

    const toggleExpand = () => {
      isExpand.value = !isExpand.value;
    };

    const openSelect = () => {
      isExpand.value = true;
    };

    const closeSelect = () => {
      isExpand.value = false;
    };

    const setInnerSingle = () => {
      const valueObj = props.options.find((item) => {
        return item.value === props.modelValue;
      });

      innerSingle.value = valueObj?.label || '';
    };

    const handleOption = async (opt) => {
      if (opt.disabled) return;

      emit('update:modelValue', opt.value);
      await nextTick();
      setInnerSingle();
      emit('onChange', opt);
      validFn('change');
      isExpand.value = false;
    };

    const isActive = (opt) => {
      return opt.value === props.modelValue;
    };

    const onRemoveItem = (opt) => {
      handleOption(opt);
    };

    watch(
      () => props.modelValue,
      () => {
        setInitValue();
      },
      { immediate: true },
    );

    return {
      // innerValue,
      toggleExpand,
      isExpand,
      handleOption,
      openSelect,
      closeSelect,
      innerSingle,
      // tagOpts,
      isActive,
      onRemoveItem,
    };
  },
});
</script>
<style lang="scss" scoped>
.re-dropdown {
  // width: 200px;
  cursor: pointer;
  /* box-shadow: 0 0 10px 3px $c-shadow; */
  position: relative;
  display: inline-block;
}

.dropdown {
  /* background-color: #eee; */
  // display: inline-block;
  min-height: 36px;
  height: auto;
  border: 1px solid $c-form-border;
  border-radius: 4px;
  @include padding(0px 10px);
  @include inline-flex();
  // width: 200px;
  position: relative;

  &__active-wrap {
    flex: 1;
  }

  &__field {
    @include font-style($c-black, 14, 400, 1px, 14px);
    background-color: transparent;
    border: 0px;
    outline: 0px;
    cursor: pointer;
  }

  &__drop-icon {
    flex: none;
    width: 15px;
    /* @include position(tr, 50%, 10px); */
    /* transform: translateY(-50%) rotate(0deg); */
    transform: rotate(0deg);
    transition: 0.4s;
    margin-left: 10px;

    &--active {
      /* transform: translateY(-50%) rotate(180deg); */
      transform: rotate(180deg);
    }
  }
}

.dropdown-options-wrap {
  display: inline-block;
  width: auto;
  background-color: $c-white;
  z-index: 100;

  &--align {
    &--center {
      @include position(tl, calc(100% + 5px), 50%);
      transform: translateX(-50%);
    }

    &--left {
      @include position(tl, calc(100% + 5px), 0);
    }

    &--right {
      @include position(tr, calc(100% + 5px), 0);
    }
  }
}

.dropdown-option-list {
  background-color: $c-white;
  height: auto;
  max-height: 200px;
  overflow: auto;

  &__item {
    @include padding(0px 10px);
    @include flex(space-between);
    min-height: 36px;
    cursor: pointer;

    &--active {
      .dropdown-option-list__item__label {
        @include font-style($c-deepblue--active, 14, 400, 1px, 14px);
      }

      .dropdown-option-list__item__check-icon {
        display: inline-block;
        vertical-align: bottom;
      }
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover {
      background-color: rgba($c-deepblue, 0.2);
    }

    &__label {
      @include font-style($c-black, 14, 400, 1px, 14px);
    }

    &__check-icon {
      display: none;
    }
  }
}
</style>
