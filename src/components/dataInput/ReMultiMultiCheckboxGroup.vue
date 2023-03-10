<template>
  <div class="re-checkbox-group" :class="[`re-checkbox-group--direction--${direction}`]">
    <!-- <template v-for="(opt, idx) of innerOptions" :key="opt.value">
      <input
        class="re-checkbox-group__field"
        type="checkbox"
        :id="uuid + opt.value + idx"
        :value="opt.value"
        :checked="isChecked(opt.value)"
        @change="(e) => handleChange(e, opt)"
      />
    </template> -->

    <div :class="[`re-checkbox-group-content--direction--${checkAllDirection}`]">
      <!-- <div class="chk-all" v-if="checkAll">
        <re-checkbox v-model="isAll" label="全選" @onChange="onChange" />
      </div> -->
      <ul class="chk-list">
        <li
          v-for="(opt, idx) of innerOptions"
          :key="opt.value"
          class="chk-list__item"
          :class="{
            'chk-list__item--disabled': opt.disabled,
          }"
          @click="handleSelectGroupValue(opt.value)"
        >
          <label class="chk-list__item__label" :for="uuid + opt.value + idx">
            <div
              class="chk-list__item__label__option"
              :class="{
                'chk-list__item__label__option--actived': purchaseCityCount[opt.value].length > 0,
              }"
            />

            <div class="chk-list__item__label__content">
              <component :is="opt.render" v-bind="opt" v-if="opt.render" />
              <p v-else class="chk-list__item__label__content__label">
                {{ opt.label }} ({{ purchaseCityCount[opt.value].length }})
              </p>
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
import useModal from '@/hooks/useModal';
import SelectCities from '@/forDev/testComponents/SelectCities.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
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

const { modal } = useModal();
const { validFn } = useValidate();
const innerOptions = shallowRef([]);
// 紀錄初始即為 disabled 狀態的選項，避免移除選時變為可選
const recordOriginDisabledItems = shallowRef([]);

const isAll = ref(false);

const purchaseCityCount = reactive({
  台北市: [],
  新北市: [],
  桃園市: [],
  台中市: [],
  台南市: [],
  高雄市: [],
});
const uuid = nanoid();

const handleChange = (e, opt) => {
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

const handleSelectGroupValue = async (optValue) => {
  const result = await modal({
    data: {
      selectCity: optValue,
      selectRegions: purchaseCityCount[optValue],
    },
    render: SelectCities,
  });

  if (result.action === 'saveAndClose') {
    purchaseCityCount[optValue] = result.cities;

    const cloneCurrValue = cloneDeep(props.modelValue);
    const newValue = {
      ...cloneCurrValue,
      [optValue]: result.cities,
    };

    emit('update:modelValue', newValue);
  }
};

const isChecked = (val) => {
  const keys = Object.keys(props.modelValue);
  return keys.includes(val);
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
  font-size: 0;

  &__item {
    display: inline-block;
    width: 100%;
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
        flex: none;
        width: 18px;
        height: 18px;
        border: 1px solid $c-deepblue;
        border-radius: 2px;

        &--actived {
          position: relative;

          &::after {
            @include position(center);
            display: block;
            width: 10px;
            height: 10px;
            content: "";
            background-color: $c-deepblue;
            border: 1px solid $c-deepblue;
            border-radius: 2px;
          }
        }
      }

      &__content {
        flex: 1;
        margin-left: 5px;

        &__label {
          @include font-style($c-black, 14, 400, 1px 14px);
          flex: 1;
        }
      }
    }
  }
}

/* s */
</style>
