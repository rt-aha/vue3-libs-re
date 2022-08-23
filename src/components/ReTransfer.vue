<template>
  <div class="re-transfer">
    <div class="transfer">
      <div class="transfer__options">
        <div class="transfer__options__header">
          <div>
            <re-checkbox v-model="isAll" label="全選" @onChange="onChange" />
          </div>
          <p class="total-count">共 {{ optionLength }} 個選項</p>
        </div>
        <re-divider :margin="{ top: '0px', bottom: '5px' }" />
        <div class="transfer__options__content">
          <re-checkbox-group v-model="innerValue" :options="options" direction="verticle" />
        </div>
      </div>
      <div class="transfer__select">
        <div class="transfer__select__header">
          <p class="checked-count">已選 {{ checkedOptionLength }} 個選項</p>
        </div>
        <div class="transfer__select__content">
          <div class="checked-list-wrap">
            <ul class="chcked-list">
              <li
                class="checked-list__item"
                :class="{ 'checked-list__item--disabled': opt.disabled }"
                v-for="opt of checkedOptions"
                :key="opt.value"
              >
                <div class="checked-list__item__box">
                  <p class="checked-list__item__box__label">
                    {{ opt.label }}
                  </p>
                  <div class="checked-list__item__box__delete" @click="removeOption(opt)">
                    <img class="checked-list__item__box__delete__icon" src="@/assets/icon/close.svg" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, shallowRef } from 'vue';
import ReCheckboxGroup from '@/components/ReCheckboxGroup.vue';
import ReCheckbox from '@/components/ReCheckbox.vue';
import ReDivider from '@/components/ReDivider.vue';

export default defineComponent({
  name: 'ReTransfer',
  components: {
    ReCheckboxGroup,
    ReCheckbox,
    ReDivider,
  },
  props: {
    modelValue: {
      type: Array,
      defualt: () => [],
    },
    options: {
      type: Array,
      defualt: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isAll = ref(false);
    const innerValue = ref(['option1']);
    // 紀錄初始即為 disabled 狀態的選項，避免移除選時變為可選
    const recordOriginDisabledItems = shallowRef([]);
    // 紀錄初始即已被選擇的選項，避免移除選時變為可選
    const recordOriginCheckedValue = shallowRef([]);

    const optionLength = computed(() => props.options.length);
    const checkedOptions = computed(() => {
      return props.options.filter((item) => {
        return innerValue.value.find((item2) => item2 === item.value);
      });
    });
    const checkedOptionLength = computed(() => checkedOptions.value.length);

    const updateModelValue = (val) => {
      innerValue.value = val;
      emit('update:modelValue', innerValue.value);
    };

    const removeOption = (opt) => {
      if (opt.disabled) return;
      const tempOpt = innerValue.value.filter((item) => item !== opt.value);

      // 更新組件內與外部 v-model 值
      updateModelValue(tempOpt);
    };

    const onChange = (val) => {
      if (val) {
        const tempOpt = props.options.reduce((list, item) => {
          if (item.disabled) {
            const isInclude = innerValue.value.includes(item.value);
            if (isInclude) {
              list.push(item.value);
            }
          } else {
            list.push(item.value);
          }

          return list;
        }, []);

        updateModelValue(tempOpt);
        return;
      }

      const temptOpt = props.options.reduce((list, item) => {
        const isDisabledItem = recordOriginDisabledItems.value.includes(item.value);
        const isOriginCheckedItem = recordOriginCheckedValue.value.includes(item.value);

        if (isDisabledItem && isOriginCheckedItem) {
          list.push(item.value);
        }

        return list;
      }, []);

      updateModelValue(temptOpt);
    };

    const checkIsAll = () => {
      // 把 disabled 拔掉比較
      const filterNonDisabledOptions = props.options.filter((item) => !item.disabled);
      const filterNonDisabledCheckedItem = innerValue.value.reduce((list, item) => {
        if (!recordOriginDisabledItems.value.includes(item)) {
          list.push(item);
        }

        return list;
      }, []);

      if (filterNonDisabledOptions.length === filterNonDisabledCheckedItem.length) {
        isAll.value = true;
      }
    };

    const init = () => {
      innerValue.value = props.modelValue;

      recordOriginDisabledItems.value = props.options.reduce((list, item) => {
        if (item.disabled) {
          list.push(item.value);
        }
        return list;
      }, []);

      recordOriginCheckedValue.value = props.options.reduce((list, item) => {
        const isChecked = innerValue.value.includes(item.value);

        if (isChecked) {
          list.push(item.value);
        }

        return list;
      }, []);

      checkIsAll();
    };

    init();

    return {
      innerValue,
      optionLength,
      checkedOptions,
      checkedOptionLength,
      removeOption,
      isAll,
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
/* * {
  outline: 1px solid #f00;
} */
.re-transfer {
}
.transfer {
  @include flex(flex-start, flex-start);
  width: 500px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  height: 200px;

  &::before {
    content: '';
    width: 1px;
    height: 100%;
    @include position(tl, 0, 50%);
    background-color: #ccc;
  }

  &__options {
    flex: none;
    width: 50%;
    @include padding(5px 10px 10px);
    height: 100%;
    @include flex(flex-start, flex-start, column);

    &__header {
      width: 100%;
      // margin-bottom: 10px;
      @include flex(flex-start, center);
      // border-bottom: 1px solid #ccc;
    }

    &__content {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }

  &__select {
    flex: none;
    width: 50%;
    @include padding(10px);
    height: 100%;
    overflow: auto;
    @include flex(flex-start, flex-start, column);

    &__header {
      width: 100%;
      margin-bottom: 5px;
      @include padding(0 0 12px 0);
      // border-bottom: 1px solid #ccc;

      /* @include padding(10px); */
    }

    &__content {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
}

.total-count {
  @include font-style($c-input-label, 14, 400, 1px, 18px);
  flex: none;
  width: auto;
}

.checked-count {
  @include font-style($c-input-label, 14, 400, 1px, 18px);
}

.checked-list {
  &__item {
    min-height: 20px;
    @include padding(5px);
    transition: 0.2s;
    cursor: pointer;
    border-radius: 2px;

    &:hover {
      background-color: rgba($c-main, 0.5);

      .checked-list__item__box__delete {
        display: block;
      }
    }

    // 為了蓋過 hover 的優先度，放 hover 下面
    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;

      .checked-list__item__box__delete {
        cursor: not-allowed;
      }

      .checked-list__item__box .checked-list__item__box__delete {
        display: none;
      }
    }

    &__box {
      @include flex(space-between);

      &__label {
        flex: 1;
        @include font-style($c-black, 14, 400, 1px 14px);
      }

      &__delete {
        flex: none;
        width: 24px;
        @include flex(center);
        display: none;
        cursor: pointer;

        &__icon {
          width: 20px;
          vertical-align: bottom;
        }
      }
    }
  }
}
</style>
