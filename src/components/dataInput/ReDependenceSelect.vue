<template>
  <div class="re-select">
    <div class="select" @click="toggleExpand" v-click-away="closeSelect">
      <div class="select__prefix">
        {{ prefix }}
      </div>

      <div class="select__active-wrap">
        {{}}
        <template v-if="multiple">
          <input class="select__field" readonly placeholder="請選擇" v-show="innerMulti.length === 0" />
          <re-select-multi-tag v-model="innerMulti" @onRemoveItem="onRemoveItem" v-show="innerMulti.length > 0" />
        </template>
        <template v-else>
          <input class="select__field" readonly :value="modelValue" placeholder="請選擇" />
        </template>
      </div>
      <img
        class="select__drop-icon"
        :class="{
          'select__drop-icon--active': isExpand,
        }"
        src="@/assets/icon/icon_down.svg"
      />
    </div>
    <!-- @click="toggleExpand" -->
    <div class="select-options-wrap">
      <ReCollapseTransition :show="isExpand">
        <div class="select-options">
          <div v-if="innerOptions.length === 0">
            <ReEmpty emptyText="請選擇縣市" />
          </div>
          <ul class="select-option-list" v-else>
            <li
              class="select-option-list__item"
              :class="{
                'select-option-list__item--disabled': opt.disabled,
                'select-option-list__item--active': isActive(opt),
              }"
              v-for="opt of innerOptions"
              :key="opt.value"
              @click="() => handleOption(opt)"
            >
              <div class="select-option-list__item__check">
                <img class="select-option-list__item__check__icon" src="@/assets/icon/check.svg" />
              </div>
              <p class="select-option-list__item__component" v-if="opt.render">
                <component :is="opt.render" v-bind="opt" />
              </p>
              <p class="select-option-list__item__label" v-else>
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
import ReSelectMultiTag from '@/components/dataInput/ReSelectMultiTag.vue';
import ReEmpty from '@/components/dataDisplay/ReEmpty.vue';

export default defineComponent({
  name: 'ReDependenceSelect',
  components: {
    ReCollapseTransition,
    ReSelectMultiTag,
    ReEmpty,
  },
  props: {
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
    dependenceValue: {
      defualt: '',
    },
    dependenceOptions: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue', 'onChange'],
  setup(props, { emit }) {
    const innerMulti = ref([]);
    const innerSingle = ref('');
    const innerOptions = ref([]);
    const validDependenceKeys = ref([]);

    // const tagOpts = ref([
    //   {
    //     label: 'opt1',
    //     value: 'opt1',
    //   },
    // ]);

    const { validFn } = useValidate();
    const isExpand = ref(false);

    const setInitValue = () => {
      console.log('12312', props.modelValue);
      if (props.multiple) {
        console.log(1111);
        innerMulti.value = props.modelValue;
      } else {
        console.log(2222);
        innerSingle.value = props.modelValue;

        console.log('innerSingle.value', innerSingle.value);
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
      const tempValue = props.options.filter((item) => props.modelValue.includes(item.value));

      innerMulti.value = tempValue;
    };

    const setInnerSingle = () => {
      const valueObj = props.options.find((item) => {
        return item.value === props.modelValue;
      });

      innerSingle.value = valueObj?.label || '';
    };

    const handleOption = async (opt) => {
      if (opt.disabled) return;

      if (props.multiple) {
        let newValue = [];
        let actionType = '';

        if (props.modelValue.includes(opt.value)) {
          newValue = props.modelValue.filter((item) => item !== opt.value);
          actionType = 'remove';
        } else {
          newValue = [...props.modelValue, opt.value];
          actionType = 'add';
        }

        emit('update:modelValue', newValue);
        await nextTick();
        setInnerMulti();
        emit('onChange', actionType, opt, newValue);
      } else {
        emit('update:modelValue', opt.value);
        await nextTick();
        setInnerSingle();
        emit('onChange', opt);
      }
      validFn('change');
      isExpand.value = false;
    };

    const isActive = (opt) => {
      if (props.multiple) {
        const isMatch = props.modelValue.includes(opt.value);
        return isMatch;
      } else {
        const isMatch = opt.value === props.modelValue;

        return isMatch;
      }
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
      if (validDependenceKeys.value.includes(props.dependenceValue)) {
        const matchList = props.dependenceOptions.find((item) => {
          return item.key === props.dependenceValue;
        });
        innerOptions.value = matchList.options;
      }
    };

    const init = () => {
      validDependenceKeys.value = props.dependenceOptions.map((item) => item.key);
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
      () => props.dependenceValue,
      (newValue) => {
        emit('update:modelValue', '');
        handleInnerOptions();
        console.log('newValue', newValue);
      },
    );

    return {
      // innerValue,
      toggleExpand,
      isExpand,
      handleOption,
      // openSelect,
      closeSelect,
      innerMulti,
      innerSingle,
      // tagOpts,
      isActive,
      onRemoveItem,
      innerOptions,
    };
  },
});
</script>
<style lang="scss" scoped>
.re-select {
  // width: 200px;
  cursor: pointer;
  /* box-shadow: 0 0 10px 3px $c-shadow; */
  position: relative;
}

.select {
  /* background-color: #eee; */
  display: inline-block;
  min-height: 48px;
  height: auto;
  background: $c-input-bg;
  border-radius: 4px;
  @include padding(0px 10px);
  @include flex();
  // width: 200px;
  position: relative;

  &__prefix {
    @include form-font();
    @include flex(center);
    color: $c-grey5;
  }

  &__active-wrap {
    flex: 1;
    margin-left: 8px;
  }

  &__field {
    @include font-style($c-black, 16, 400, 1px, 18px);
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

.select-options-wrap {
  @include position(tl, calc(100% + 5px), 0);
  // background-color: $c-input-bg;
  width: 100%;
  z-index: 100;
  border-radius: 4px;
  background-color: $c-input-bg;
}

.select-option-list {
  // background-color: $c-input-bg;
  // height: auto;
  max-height: 200px;
  overflow: auto;

  &__item {
    @include padding(0px 10px);
    @include flex();
    min-height: 48px;
    cursor: pointer;

    &--active {
      // .select-option-list__item__label {
      //   @include font-style($c-lightblue1, 16, 400, 1px, 14px);
      // }

      .select-option-list__item__check__icon {
        display: inline-block;
      }
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover {
      background-color: rgba($c-main, 0.2);
    }

    &__label {
      @include font-style($c-black, 16, 400, 1px, 14px);
    }

    &__check {
      width: 30px;
      &__icon {
        vertical-align: bottom;
        display: none;
        width: 20px;
      }
    }
  }
}
</style>
