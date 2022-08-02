<template>
  <div class="re-checkbox">
    <template v-for="(opt, idx) of optionConfig" :key="opt.value">
      <input
        class="re-checkbox__field"
        type="checkbox"
        :id="uuid + opt.value + idx"
        :value="opt.value"
        :checked="modelValue.includes(opt.value)"
        @change="handleChange"
      />
    </template>

    <ul class="chk-list">
      <li class="chk-list__item" v-for="(opt, idx) of optionConfig" :key="opt.value">
        <label class="chk-list__item__wrap" :for="uuid + opt.value + idx">
          <div
            class="chk-list__item__wrap__box"
            :class="{
              'chk-list__item__wrap__box--actived': modelValue.includes(opt.value),
            }"
          ></div>

          <p class="chk-list__item__wrap__label">{{ opt.label }}</p>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { v4 as uuid } from 'uuid';
import useValidate from '@/hooks/useValidate';

export default defineComponent({
  name: 'ReReCheckbox',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    optionConfig: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { validFn } = useValidate();

    const handleChange = (e) => {
      let newValue = [];
      if (props.modelValue.includes(e.target.value)) {
        newValue = props.modelValue.filter((item) => item !== e.target.value);
      } else {
        newValue = [...props.modelValue, e.target.value];
      }

      emit('update:modelValue', newValue);
      validFn('change');
    };

    return {
      uuid: uuid(),
      handleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-checkbox {
  &__field {
    display: none;
  }
}
.chk-list {
  &__item {
    & + & {
      margin-top: 10px;
    }
    &__wrap {
      @include flex();

      &__box {
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

      &__label {
        margin-left: 5px;
        @include font-style($c-black, 14, 400, 1px 14px);
        cursor: pointer;
      }
    }
  }
}
</style>
