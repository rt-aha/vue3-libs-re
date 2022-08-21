<template>
  <div class="re-checkbox-group" :class="[`re-checkbox-group--direction--${direction}`]">
    <template v-for="(opt, idx) of optionConfig" :key="opt.value">
      <input
        class="re-checkbox-group__field"
        type="checkbox"
        :id="uuid + opt.value + idx"
        :value="opt.value"
        :checked="modelValue.includes(opt.value)"
        @change="(e) => handleChange(e, opt)"
      />
    </template>

    <div :class="[`re-checkbox-group-content--direction--${checkAllDirection}`]">
      <div class="chk-all" v-if="checkAll">
        <re-checkbox v-model="isAll" label="全選" @onChange="onChange" />
      </div>
      <ul class="chk-list">
        <li
          class="chk-list__item"
          :class="{
            'chk-list__item--disabled': opt.disabled,
          }"
          v-for="(opt, idx) of optionConfig"
          :key="opt.value"
        >
          <label class="chk-list__item__label" :for="uuid + opt.value + idx">
            <div
              class="chk-list__item__label__option"
              :class="{
                'chk-list__item__label__option--actived': modelValue.includes(opt.value),
              }"
            ></div>

            <div class="chk-list__item__label__content">
              <component :is="opt.render" v-bind="opt" v-if="opt.render" />
              <p class="chk-list__item__label__content__label" v-else>{{ opt.label }}</p>
            </div>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { v4 as uuid } from 'uuid';
import useValidate from '@/hooks/useValidate';
import ReCheckbox from '@/components/ReCheckbox.vue';
// import { cloneDeep } from 'lodash-es';

export default defineComponent({
  name: 'ReCheckboxGroup',
  components: {
    ReCheckbox,
  },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    optionConfig: {
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
  },
  emits: ['update:modelValue', 'onChange'],
  setup(props, { emit }) {
    const isAll = ref(false);
    const { validFn } = useValidate();

    const handleChange = (e, opt) => {
      if (opt.disabled) return;
      let newValue = [];
      let actionType = '';
      if (props.modelValue.includes(e.target.value)) {
        newValue = props.modelValue.filter((item) => item !== e.target.value);
        actionType = 'remove';
      } else {
        newValue = [...props.modelValue, e.target.value];
        actionType = 'add';
      }

      // 有全選選項時
      if (props.checkAll) {
        if (newValue.length === props.optionConfig.length) {
          isAll.value = true;
        } else {
          isAll.value = false;
        }
      }

      emit('update:modelValue', newValue);
      emit('onChange', actionType, opt, newValue);
      validFn('change');
    };

    const onChange = (val) => {
      if (!props.checkAll) return;

      let actionType = '';
      let newValue = [];
      if (val) {
        actionType = 'all';
        newValue = props.optionConfig.map((item) => item.value);
        // newValue = cloneDeep(props.optionConfig);
      } else {
        actionType = 'reset';
      }

      // 行為動作、修改值、更新後的值，修改值與更新後的值剛好一樣，所以有兩個一樣的變數
      emit('update:modelValue', newValue);
      emit('onChange', actionType, newValue, newValue);
      validFn('change');
    };

    return {
      uuid: uuid(),
      handleChange,
      isAll,
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
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

  &__item {
    margin-right: 10px;
    margin-bottom: 10px;

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
        width: 16px;
        height: 16px;
        border: 1px solid $c-main;
        border-radius: 4px;

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
</style>
