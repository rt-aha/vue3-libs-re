<template>
  <div class="re-select">
    <div v-click-away="closeSelect" class="select" @click="toggleExpand">
      <div class="select__active-wrap">
        <template v-if="multiple">
          <input v-show="innerMulti.length === 0" class="select__field" readonly placeholder="請選擇">
          <ReSelectMultiTag v-show="innerMulti.length > 0" v-model="innerMulti" @onRemoveItem="onRemoveItem" />
        </template>
        <template v-else>
          <input class="select__field" readonly :value="modelValue" placeholder="請選擇">
        </template>
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
          <div v-if="innerOptions.length === 0">
            <ReEmpty empty-text="請選擇縣市" />
          </div>
          <ul v-else class="select-option-list">
            <li
              v-for="opt of innerOptions"
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
import ReSelectMultiTag from '@/components/dataInput/ReSelectMultiTag.vue';
import ReEmpty from '@/components/dataDisplay/ReEmpty.vue';

const props = defineProps({
  modelValue: {
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    defualt: false,
  },
  prefix: {
    type: String,
    defualt: '',
  },
  extraValue: {
    defualt: '',
  },
  dependenceOptions: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['update:modelValue', 'onChange']);
const innerMulti = ref([]);
const innerSingle = ref('');
const innerOptions = ref([]);
const validDependenceKeys = ref([]);

const { validFn } = useValidate();
const isExpand = ref(false);

const setInitValue = () => {
  if (props.multiple) {
    innerMulti.value = props.modelValue;
  }
  else {
    innerSingle.value = props.modelValue;
  }
};

const toggleExpand = () => {
  isExpand.value = !isExpand.value;
};

// const openSelect = () => {
//   isExpand.value = true;
// };

const closeSelect = () => {
  isExpand.value = false;
};

const setInnerMulti = () => {
  const tempValue = props.options.filter(item => props.modelValue.includes(item.value));

  innerMulti.value = tempValue;
};

const setInnerSingle = () => {
  const valueObj = props.options.find((item) => {
    return item.value === props.modelValue;
  });

  innerSingle.value = valueObj?.label || '';
};

const handleOption = async (opt) => {
  if (opt.disabled) { return; }

  if (props.multiple) {
    let newValue = [];
    let actionType = '';

    if (props.modelValue.includes(opt.value)) {
      newValue = props.modelValue.filter(item => item !== opt.value);
      actionType = 'remove';
    }
    else {
      newValue = [...props.modelValue, opt.value];
      actionType = 'add';
    }

    emit('update:modelValue', newValue);
    await nextTick();
    setInnerMulti();
    emit('onChange', actionType, opt, newValue);
  }
  else {
    emit('update:modelValue', opt.value);
    await nextTick();
    setInnerSingle();
    emit('onChange', opt);
  }
  validFn('change');
  isExpand.value = false;
};

const isActive = (opt) => {
  console.log('opt', opt);
  if (props.multiple) {
    console.log(1);
    return props.modelValue.includes(opt.value);
  }

  console.log(2, opt.value, props.modelValue, opt.value === props.modelValue);

  return opt.value === props.modelValue;
};

const onRemoveItem = (opt) => {
  handleOption(opt);
};

// const innerValue = computed(() => {
//   const valueObj = props.options.find((item) => {
//     return item.value === props.modelValue;
//   });

//   return valueObj?.label || '';
// });

const handleInnerOptions = () => {
  if (validDependenceKeys.value.includes(props.extraValue)) {
    const matchList = props.dependenceOptions.find((item) => {
      return item.key === props.extraValue;
    });

    console.log('matchList', matchList);
    innerOptions.value = matchList.options;
  }
};

const init = () => {
  validDependenceKeys.value = props.dependenceOptions.map(item => item.key);
};

init();

watch(
  () => props.modelValue,
  () => {
    setInitValue();
  },
  { immediate: true },
);

watch(
  () => props.extraValue,
  (newValue) => {
    emit('update:modelValue', '');
    handleInnerOptions();
    console.log('newValue', newValue);
  },
);
</script>

<style lang="scss" scoped>
.re-select {
  /* box-shadow: 0 0 10px 3px $c-shadow; */
  position: relative;
  // width: 200px;
  cursor: pointer;
}

.select {
  @include padding(0 10px);
  @include flex();
  // width: 200px;
  position: relative;

  /* background-color: #eee; */
  display: inline-block;
  height: auto;
  min-height: 36px;
  border: 1px solid $c-form-border;
  border-radius: 4px;

  &__active-wrap {
    flex: 1;
  }

  &__field {
    @include font-style($c-black, 14, 400, 1px, 14px);
    width: 100%;
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

    &--active {
      .select-option-list__item__label {
        @include font-style($c-deepblue--active, 14, 400, 1px, 14px);
      }

      .select-option-list__item__check-icon {
        display: inline-block;
        vertical-align: bottom;
      }
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
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
