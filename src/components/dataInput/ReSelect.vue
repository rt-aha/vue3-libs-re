<template>
  <div
    class="re-select"
    :class="{
      're-select--disabled': disabled,
    }"
  >
    <div v-click-away="closeSelect" class="select" @click="toggleExpand">
      <div
        class="select__active-wrap"
      >
        <input v-model="innerSingle" class="select__field" readonly placeholder="請選擇">
      </div>
      <img
        class="select__drop-icon"
        :class="{
          'select__drop-icon--active': isExpand,
        }"
        src="@/assets/icon/icon-down.svg"
      >
    </div>
    <!-- @click="toggleExpand" -->
    <div class="select-options-wrap">
      <ReCollapseTransition :show="isExpand">
        <div class="select-options">
          <div v-if="options.length === 0">
            <slot name="noData" />
          </div>
          <ul v-else class="select-option-list">
            <li
              v-for="opt of options"
              :key="opt.value"
              class="select-option-list__item"
              :class="{
                'select-option-list__item--disabled': opt.disabled,
                'select-option-list__item--active': isActive(opt),
              }"
              @click="() => handleOption(opt)"
            >
              <p v-if="opt.render" class="select-option-list__item__component">
                <component :is="opt.render" v-bind="opt" />
              </p>
              <p v-else class="select-option-list__item__label">
                {{ opt.label }}
              </p>
              <img class="select-option-list__item__check-icon" src="@/assets/icon/check.svg">
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
  disabled: {
    type: Boolean,
    defualt: false,
  },
});
const emit = defineEmits(['update:modelValue', 'onChange']);

const { validFn } = useValidate();
const innerSingle = ref('');
const isExpand = ref(false);

const setInitValue = () => {
  const matchOpt = props.options.find(item => props.modelValue === item.value);
  if (matchOpt) {
    innerSingle.value = matchOpt.label;
  }
};

const toggleExpand = () => {
  if (props.disabled) { return; }

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
  const isMatch = opt.value === props.modelValue;
  return isMatch;
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
.re-select {
  position: relative;
  cursor: pointer;

  &--disabled {
    @include disabled();
  }
}

.select {
  @include padding(0 10px);
  @include flex();
  position: relative;
  height: auto;
  min-height: 36px;
  border: 1px solid $c-form-assist;
  border-radius: 4px;

  &__active-wrap {
    flex: 1;
  }

  &__field {
    @include font-style($c-black, 14, 400, 1px, 14px);
    width: 100%;
    cursor: inherit;
    background-color: transparent;
    border: 0;
    outline: 0;
  }

  &__drop-icon {
    flex: none;
    width: 15px;
    margin-left: 10px;
    transition: 0.4s;
    transform: rotate(0deg);

    &--active {
      transform: rotate(180deg);
    }
  }
}

.select-options-wrap {
  @include position(tl, calc(100% + 5px), 0);
  z-index: 100;
  width: 100%;
  background-color: $c-white;
}

.select-option-list {
  height: auto;
  max-height: 200px;
  overflow: auto;
  background-color: $c-white;

  &__item {
    @include padding(0 10px);
    @include flex(space-between);
    min-height: 36px;
    cursor: pointer;

    &:hover {
      background-color: rgba($c-form-hover-bg, 0.2);

      .select-option-list__item__label {
        color: $c-form-active;
      }
    }

    &--active {
      .select-option-list__item__label {
        @include font-style($c-form-active, 14, 400, 1px, 14px);
      }

      .select-option-list__item__check-icon {
        display: inline-block;
        vertical-align: bottom;
      }
    }

    &--disabled {
      @include disabled();
    }

    &__label {
      @include font-style($c-form-main, 14, 400, 1px, 14px);
    }

    &__check-icon {
      display: none;
    }
  }
}
</style>
