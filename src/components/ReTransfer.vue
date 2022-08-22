<template>
  <div class="re-transfer">
    <div class="transfer">
      <div class="transfer__options">
        <div class="transfer__options__header">
          <p class="total-count">共 {{ optionLength }} 個選項</p>
        </div>
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
import { defineComponent, ref, computed } from 'vue';
import ReCheckboxGroup from '@/components/ReCheckboxGroup.vue';

export default defineComponent({
  name: 'ReTransfer',
  components: {
    ReCheckboxGroup,
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
    const innerValue = ref(['option1']);

    const optionLength = computed(() => props.options.length);
    const checkedOptions = computed(() => {
      return props.options.filter((item) => {
        return innerValue.value.find((item2) => item2 === item.value);
      });
    });
    const checkedOptionLength = computed(() => checkedOptions.value.length);

    const removeOption = (opt) => {
      if (opt.disabled) return;
      const tempOpt = innerValue.value.filter((item) => item !== opt.value);

      // 更新組件內與外部 v-model 值
      innerValue.value = tempOpt;
      emit('update:modelValue', innerValue.value);
    };

    const init = () => {
      innerValue.value = props.modelValue;
    };

    init();

    return {
      innerValue,
      optionLength,
      checkedOptions,
      checkedOptionLength,
      removeOption,
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
    @include padding(10px);
    height: 100%;
    @include flex(flex-start, flex-start, column);

    &__header {
      margin-bottom: 10px;
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
      margin-bottom: 5px;

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

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;

      .checked-list__item__box__delete {
        cursor: not-allowed;
      }
    }

    &:hover {
      background-color: rgba($c-main, 0.5);

      .checked-list__item__box__delete {
        display: block;
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
