<template>
  <div class="re-dropdown">
    <div v-click-away="closeSelect" class="dropdown" @click="toggleExpand">
      <div class="dropdown__active-wrap">
        <p class="dropdown__field">
          {{ innerSingle }}
        </p>
      </div>
    </div>
    <!-- @click="toggleExpand" -->
    <div class="dropdown-options-wrap" :class="[`dropdown-options-wrap--align--${align}`]">
      <ReCollapseTransition :show="isExpand">
        <div class="dropdown-options">
          <ul class="dropdown-option-list">
            <li
              v-for="opt of options"
              :key="opt.value"
              class="dropdown-option-list__item"
              :class="{
                'dropdown-option-list__item--disabled': opt.disabled,
                'dropdown-option-list__item--active': isActive(opt),
              }"
              @click="() => handleOption(opt)"
            >
              <p v-if="opt.render" class="dropdown-option-list__item__component">
                <component :is="opt.render" v-bind="opt" />
              </p>
              <p v-else class="dropdown-option-list__item__label">
                {{ opt.label }}
              </p>
            </li>
          </ul>
        </div>
      </ReCollapseTransition>
    </div>
  </div>
</template>

<script setup>
import ReCollapseTransition from '@/components/utility/ReCollapseTransition.vue';
import useValidate from '@/hooks/useValidate';

const props = defineProps({
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
});
const emit = defineEmits(['update:modelValue', 'onChange']);

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
  if (opt.disabled) { return; }

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
</script>

<style lang="scss" scoped>
.re-dropdown {
  /* box-shadow: 0 0 10px 3px $c-shadow; */
  position: relative;
  display: inline-block;
  // width: 200px;
  cursor: pointer;
}

.dropdown {
  @include padding(0 10px);
  @include inline-flex();
  // width: 200px;
  position: relative;
  height: auto;

  /* background-color: #eee; */
  // display: inline-block;
  min-height: 36px;
  border: 1px solid $c-dropdown-asssit;
  border-radius: 4px;

  &__active-wrap {
    flex: 1;
  }

  &__field {
    @include font-style($c-dropdown-main, 14, 400, 1px, 14px);
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
  }

  &__drop-icon {
    flex: none;
    width: 15px;
    margin-left: 10px;
    transition: 0.4s;

    /* @include position(tr, 50%, 10px); */

    /* transform: translateY(-50%) rotate(0deg); */
    transform: rotate(0deg);

    &--active {
      /* transform: translateY(-50%) rotate(180deg); */
      transform: rotate(180deg);
    }
  }
}

.dropdown-options-wrap {
  z-index: 100;
  display: inline-block;
  width: auto;
  background-color: $c-white;

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
  height: auto;
  max-height: 200px;
  overflow: auto;
  background-color: $c-white;

  &__item {
    @include padding(0 10px);
    @include flex(space-between);
    min-height: 36px;
    cursor: pointer;

    &--active {
      .dropdown-option-list__item__label {
        @include font-style($c-dropdown-active, 14, 400, 1px, 14px);
      }

      .dropdown-option-list__item__check-icon {
        display: inline-block;
        vertical-align: bottom;
      }
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &:hover {
      .dropdown-option-list__item__label {
        color: $c-dropdown-hover;
      }

      background-color: rgba($c-dropdown-hover-bg, 0.2);
    }

    &__label {
      @include font-style($c-dropdown-main, 14, 400, 1px, 14px);
    }

    &__check-icon {
      display: none;
    }
  }
}
</style>
