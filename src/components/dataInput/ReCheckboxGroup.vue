<template>
  <div
    class="re-checkbox-group"
    :class="[`re-checkbox-group--direction--${direction}`,
             {
               're-checkbox-group--disabled': disabled,
             }]"
  >
    <template v-for="(opt, idx) of innerOptions" :key="opt.value">
      <input
        :id="uuid + opt.value + idx"
        class="re-checkbox-group__field"
        type="checkbox"
        :value="opt.value"
        :checked="modelValue.includes(opt.value)"
        @change="(e) => handleChange(e, opt)"
      >
    </template>

    <div :class="[`re-checkbox-group-content--direction--${checkAllDirection}`]">
      <div v-if="checkAll" class="chk-all">
        <ReCheckbox v-model="isAll" label="全選" @onChange="onChange" />
      </div>
      <ul class="chk-list">
        <li
          v-for="(opt, idx) of innerOptions"
          :key="opt.value"
          class="chk-list__item"
          :class="{
            'chk-list__item--disabled': opt.disabled,
          }"
        >
          <label class="chk-list__item__label" :for="uuid + opt.value + idx">
            <div
              class="chk-list__item__label__option"
              :class="{
                'chk-list__item__label__option--actived': modelValue.includes(opt.value),
              }"
            />

            <div class="chk-list__item__label__content">
              <component :is="opt.render" v-bind="opt" v-if="opt.render" />
              <p v-else class="chk-list__item__label__content__label">{{ opt.label }}</p>
            </div>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import useValidate from '@/hooks/useValidate';
import ReCheckbox from '@/components/dataInput/ReCheckbox.vue';
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
  checkAll: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  checkAllDirection: {
    type: String,
    default: 'horizontal',
  },
  limit: {
    type: [String, Number, undefined],
    default: undefined,
  },
});

const emit = defineEmits(['update:modelValue', 'onChange']);

const uuid = nanoid();

const isAll = ref(false);
const { validFn } = useValidate();
const innerOptions = shallowRef([]);
// 紀錄初始即為 disabled 狀態的選項，避免移除選時變為可選
const recordOriginDisabledItems = shallowRef([]);

const handleChange = (e, opt) => {
  if (props.disabled) { return; }
  if (opt.disabled) { return; }
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

  // 有全選選項時
  if (props.checkAll) {
    if (newValue.length === innerOptions.value.length) {
      isAll.value = true;
    }
    else {
      isAll.value = false;
    }
  }

  if (props.limit) {
    const limitNum = Number(props.limit);
    const newValueLen = newValue.length;

    if (newValueLen >= limitNum) {
      innerOptions.value = innerOptions.value.map((item) => {
        const isItemInNewValue = newValue.includes(item.value);
        if (!isItemInNewValue) {
          item.disabled = true;
        }

        return item;
      });
    }
    else {
      innerOptions.value = innerOptions.value.map((item) => {
        const isDisabledItem = recordOriginDisabledItems.value.includes(item.value);
        if (isDisabledItem) {
          item.disabled = true;
        }
        else {
          item.disabled = false;
        }

        return item;
      });
    }
  }

  emit('update:modelValue', newValue);
  emit('onChange', actionType, opt, newValue);
  validFn('change');
};

const onChange = (val) => {
  if (!props.checkAll) { return; }

  let actionType = '';
  let newValue = [];
  if (val) {
    actionType = 'all';
    newValue = innerOptions.value.map(item => item.value);
    // newValue = cloneDeep(props.innerOptions);
  }
  else {
    actionType = 'reset';
  }

  // 行為動作、修改值、更新後的值，修改值與更新後的值剛好一樣，所以有兩個一樣的變數
  emit('update:modelValue', newValue);
  emit('onChange', actionType, newValue, newValue);
  validFn('change');
};

const initChecked = () => {
  if (props.limit && props.checkAll) {
    console.warn('limit 與 checkAll 不應同時存在');
  }
};

const init = () => {
  recordOriginDisabledItems.value = props.options.reduce((list, item) => {
    if (item.disabled) {
      list.push(item.value);
    }
    return list;
  }, []);
  innerOptions.value = cloneDeep(props.options);
};

initChecked();
init();

watch(
  () => props.options,
  () => {
    init();
  },
);
</script>

<style lang="scss" scoped>
// * {
//   outline: 1px solid #f00;
// }
.re-checkbox-group {
  width: 100%;

  &--direction {
    &--horizontal {
      color: blue;

      .chk-list__item {
        display: inline-block;
      }
    }

    &--vertical {
      .chk-list__item {
        display: block;
        width: 100%;
      }
    }
  }

  &--disabled {
    .chk-list__item__label {
      @include disabled();
    }
  }

  &__field {
    display: none;
  }
}

.re-checkbox-group-content {
  &--direction {
    &--horizontal {
      @include flex(flex-start, flex-start);

      .chk-all {
        flex: none;
        width: auto;
      }

      .chk-list {
        flex: 1;
      }
    }

    /* &--vertical {} */
  }
}

.chk-list {
  width: 100%;

  &__item {
    padding: 5px 10px 5px 0;

    &--disabled {
      opacity: 0.5;

      .chk-list__item__label {
        cursor: not-allowed;
      }
    }

    &__label {
      @include flex(flex-start, flex-start);
      cursor: pointer;

      &__option {
        box-sizing: border-box;
        flex: none;
        width: 18px;
        height: 18px;
        border: 1px solid $c-form-main;
        border-radius: 2px;

        &--actived {
          position: relative;

          &::after {
            @include position(center);
            display: block;
            width: 8px;
            height: 8px;
            content: "";
            background-color: $c-form-selected;
            border: 1px solid $c-form-selected;
            border-radius: 2px;
          }
        }
      }

      &__content {
        flex: 1;
        margin-left: 5px;

        &__label {
          @include font-style($c-form-main, 14, 400, 1px 14px);
          flex: 1;
        }
      }
    }
  }
}
</style>
