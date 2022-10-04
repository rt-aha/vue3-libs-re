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
          class="chk-list__item"
          :class="{
            'chk-list__item--disabled': opt.disabled,
          }"
          v-for="(opt, idx) of innerOptions"
          :key="opt.value"
          @click="handleSelectGroupValue(opt.value)"
        >
          <label class="chk-list__item__label" :for="uuid + opt.value + idx">
            <div
              class="chk-list__item__label__option"
              :class="{
                'chk-list__item__label__option--actived': purchaseCityCount[opt.value].length > 0,
              }"
            ></div>

            <div class="chk-list__item__label__content">
              <component :is="opt.render" v-bind="opt" v-if="opt.render" />
              <p class="chk-list__item__label__content__label" v-else>
                {{ opt.label }} ({{ purchaseCityCount[opt.value].length }})
              </p>
            </div>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, shallowRef, watch, reactive } from 'vue';
import { v4 as uuid } from 'uuid';
import useValidate from '@/hooks/useValidate';
import ReCheckbox from '@/components/dataInput/ReCheckbox.vue';
import { cloneDeep } from 'lodash-es';
import useModal from '@/hooks/useModal';
import SelectCities from '@/forDev/testComponents/SelectCities.vue';

export default defineComponent({
  name: 'ReMultiMultiCheckboxGroup',
  components: {
    ReCheckbox,
  },
  props: {
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
  },
  emits: ['update:modelValue', 'onChange'],
  setup(props, { emit }) {
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

    const handleChange = (e, opt) => {
      if (opt.disabled) return;
      let newValue = [];
      let actionType = '';
      if (props.modelValue.includes(opt.value)) {
        newValue = props.modelValue.filter((item) => item !== opt.value);
        actionType = 'remove';
      } else {
        newValue = [...props.modelValue, opt.value];

        actionType = 'add';
      }

      // 有全選選項時
      if (props.checkAll) {
        if (newValue.length === innerOptions.value.length) {
          isAll.value = true;
        } else {
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
        } else {
          innerOptions.value = innerOptions.value.map((item) => {
            const isDisabledItem = recordOriginDisabledItems.value.includes(item.value);
            if (isDisabledItem) {
              item.disabled = true;
            } else {
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

    // const onChange = (val) => {
    //   if (!props.checkAll) return;

    //   let actionType = '';
    //   let newValue = [];
    //   if (val) {
    //     actionType = 'all';
    //     newValue = innerOptions.value.map((item) => item.value);
    //     // newValue = cloneDeep(props.innerOptions);
    //   } else {
    //     actionType = 'reset';
    //   }

    //   // 行為動作、修改值、更新後的值，修改值與更新後的值剛好一樣，所以有兩個一樣的變數
    //   emit('update:modelValue', newValue);
    //   emit('onChange', actionType, newValue, newValue);
    //   validFn('change');
    // };

    const initChecked = () => {
      if (props.limit && props.checkAll) {
        console.warn(`limit 與 checkAll 不應同時存在`);
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

    return {
      uuid: uuid(),
      handleChange,
      isAll,
      // onChange,
      innerOptions,
      recordOriginDisabledItems,
      handleSelectGroupValue,
      purchaseCityCount,
      isChecked,
    };
  },
});
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
    padding: 5px 10px 5px 0;
    display: inline-block;
    width: 100%;

    &--disabled {
      opacity: 0.5;

      .chk-list__item__label {
        cursor: not-allowed;
      }
    }

    &__label {
      cursor: pointer;
      @include flex(flex-start, flex-start);

      &__option {
        flex: none;
        width: 18px;
        height: 18px;
        border: 1px solid $c-main;
        border-radius: 2px;

        &--actived {
          position: relative;

          &::after {
            content: '';
            display: block;
            @include position(center);
            width: 10px;
            height: 10px;
            border: 1px solid $c-main;
            background-color: $c-main;
            border-radius: 2px;
          }
        }
      }

      &__content {
        flex: 1;
        margin-left: 5px;

        &__label {
          flex: 1;
          @include font-style($c-black, 14, 400, 1px 14px);
        }
      }
    }
  }
}
/* s */
</style>
