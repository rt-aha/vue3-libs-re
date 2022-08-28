<template>
  <div class="re-select">
    <div class="select" @click.stop="toggleExpand">
      <div class="select__active-wrap">
        <template v-if="multiple">
          <input class="select__field" readonly placeholder="請選擇" v-show="innerMulti.length === 0" />
          <re-select-multi-tag v-model="innerMulti" @onRemoveItem="onRemoveItem" v-show="innerMulti.length > 0" />
        </template>
        <template v-else>
          <input class="select__field" readonly v-model="innerSingle" placeholder="請選擇" />
        </template>
      </div>
      <img
        class="select__drop-icon"
        :class="{
          'select__drop-icon--active': isExpand,
        }"
        src="@/assets/icon/icon-down.svg"
      />
    </div>
    <!-- @click="toggleExpand" -->
    <div class="select-options-wrap">
      <ReCollapseTransition :show="isExpand">
        <div class="select-options" v-click-away="closeSelect">
          <ul class="select-option-list">
            <li
              class="select-option-list__item"
              :class="{
                'select-option-list__item--disabled': opt.disabled,
                'select-option-list__item--active': isActive(opt),
              }"
              v-for="opt of options"
              :key="opt.value"
              @click="() => handleOption(opt)"
            >
              <p class="select-option-list__item__component" v-if="opt.render">
                <component :is="opt.render" v-bind="opt" />
              </p>
              <p class="select-option-list__item__label" v-else>
                {{ opt.label }}
              </p>
              <img class="select-option-list__item__check-icon" src="@/assets/icon/check.svg" />
            </li>
          </ul>
        </div>
      </ReCollapseTransition>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch, nextTick } from 'vue';
import ReCollapseTransition from '@/components/ReCollapseTransition.vue';
import useValidate from '@/hooks/useValidate';
import ReSelectMultiTag from '@/components/ReSelectMultiTag.vue';

export default defineComponent({
  name: 'ReSelect',
  components: {
    ReCollapseTransition,
    ReSelectMultiTag,
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
  },
  emits: ['update:modelValue', 'onChange'],
  setup(props, { emit }) {
    const innerMulti = ref([]);

    const innerSingle = ref('');

    // const tagOpts = ref([
    //   {
    //     label: 'opt1',
    //     value: 'opt1',
    //   },
    // ]);

    const { validFn } = useValidate();
    const isExpand = ref(false);

    const setInitValue = () => {
      if (props.multiple) {
        innerSingle.value = props.modelValue;
      } else {
        innerMulti.value = props.modelValue;
      }
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
      innerMulti,
      innerSingle,
      // tagOpts,
      isActive,
      onRemoveItem,
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
  min-height: 36px;
  height: auto;
  border: 1px solid $c-form-border;
  border-radius: 4px;
  @include padding(0px 10px);
  @include flex();
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

.select-options-wrap {
  @include position(tl, calc(100% + 5px), 0);
  background-color: $c-white;
  width: 100%;
  z-index: 100;
}

.select-option-list {
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
      .select-option-list__item__label {
        @include font-style($c-main--active, 14, 400, 1px, 14px);
      }

      .select-option-list__item__check-icon {
        display: inline-block;
        vertical-align: bottom;
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
      @include font-style($c-black, 14, 400, 1px, 14px);
    }

    &__check-icon {
      display: none;
    }
  }
}
</style>
