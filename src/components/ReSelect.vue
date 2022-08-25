<template>
  <div class="re-select">
    <div class="select" @click.stop="toggleExpand">
      <div>
        <template v-if="multiple">
          <re-select-multi-tag v-model="innerMulti" />
        </template>
        <template v-else>
          <input class="select__field" readonly v-model="innerSingle" />
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
              }"
              v-for="opt of options"
              :key="opt.value"
              @click="() => handleOption(opt)"
            >
              <p class="select-option-list__item__label">
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
    const innerMulti = ref([
      {
        label: 'opt1',
        value: 'opt1',
      },
    ]);

    const innerSingle = ref('123');

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

      console.log('isExpand.value', isExpand.value);
    };

    const openSelect = () => {
      isExpand.value = true;
    };

    const closeSelect = () => {
      isExpand.value = false;
    };

    const setInnerMulti = () => {
      console.log('props.modelValue', props.modelValue);

      const tempValue = props.options.filter((item) => props.modelValue.includes(item.value));

      console.log('tempValue', tempValue);

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
        console.log('props.modelValue', props.modelValue);
        console.log('opt.value', opt.value);
        if (props.modelValue.includes(opt.value)) {
          newValue = props.modelValue.filter((item) => item !== opt.value);
          actionType = 'remove';
        } else {
          newValue = [...props.modelValue, opt.value];
          actionType = 'add';
        }

        console.log('newValue', newValue);

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
  height: 36px;
  border: 1px solid $c-form-border;
  border-radius: 4px;
  @include padding(0px 10px);
  @include flex();
  // width: 200px;
  position: relative;

  &__field {
    @include font-style($c-black, 14, 400, 1px, 14px);
    background-color: transparent;
    border: 0px;
    outline: 0px;
  }

  &__drop-icon {
    width: 15px;
    @include position(tr, 50%, 10px);
    transform: translateY(-50%) rotate(0deg);
    transition: 0.4s;

    &--active {
      transform: translateY(-50%) rotate(180deg);
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

  &__item {
    @include padding(0px 10px);
    @include flex();
    height: 36px;
    cursor: pointer;

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
  }
}
</style>
