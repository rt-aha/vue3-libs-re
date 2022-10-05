<template>
  <div class="re-input-list">
    <div class="re-input-list__add" @click="addNewItem">
      <span class="re-input-list__add__text">新增</span>
      <img class="re-input-list__add__icon" src="@/assets/icon/add.svg" @click="addNew">
    </div>

    <div v-for="v of innerValue" :key="v.id" class="re-input" :class="{ 're-input--disabled': disabled }">
      <div class="re-input__center">
        <div class="re-input__center__main">
          <input
            ref="inputField"
            class="re-input-native-field"
            :value="v.value"
            :disabled="v.disabled"
            @input="(e) => updateValue(e, v, 'input')"
            @change="(e) => updateValue(e, v, 'change')"
            @blur="(e) => updateValue(e, v, 'blur')"
          >
        </div>
        <div class="re-input__center__remove" @click="removeItem(v)">
          <img class="re-input__center__remove__icon" src="@/assets/icon/close.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { v4 as uuid } from 'uuid';
import useValidate from '@/hooks/useValidate';

export default defineComponent({
  name: 'ReInputList',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'input',
    },
    step: {
      type: [String, Number],
      default: 1,
    },
    max: {
      type: [String, Number, undefined],
      default: undefined,
    },
    min: {
      type: [String, Number, undefined],
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const { validFn } = useValidate();
    const inputType = ref('');
    const innerValue = ref([]);
    // const validFn = getCurrentInstance().parent.ctx.validateFields;
    const inputField = ref(null);
    // const formRules = inject('formRules', {});

    const updateValue = (e, v, event) => {
      if (v.disabled) { return; }
      innerValue.value = innerValue.value.map((item) => {
        if (item.id === v.id) {
          item.value = e.target.value;
        }

        return item;
      });

      emit('update:modelValue', innerValue.value);
      validFn(event);
    };

    const addNewItem = () => {
      innerValue.value.push({
        value: '',
        id: uuid(),
      });
      emit('update:modelValue', innerValue.value);
    };

    const removeItem = (v) => {
      console.log('removeItem', v);

      innerValue.value = innerValue.value.filter((item) => {
        console.log('...', item.id, v.id);
        return item.id !== v.id;
      });

      emit('update:modelValue', innerValue.value);
    };

    const init = () => {
      innerValue.value = props.modelValue;
    };

    init();

    return {
      innerValue,
      inputField,
      updateValue,
      slots,
      inputType,
      addNewItem,
      removeItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-input-list {
  width: 100%;

  &__add {
    @include flex();
    height: 40px;
    cursor: pointer;

    &__icon {
      width: 16px;
    }

    &__text {
      margin-left: 5px;
      @include font-style($c-deepblue, 14);
    }
  }
}
.re-input {
  width: 100%;
  height: 36px;
  border: 1px solid $c-form-border;
  @include padding(5px 0px);
  border-radius: 4px;
  @include flex();

  & + & {
    margin-top: 10px;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;

    .re-input-native-field,
    .re-input__center__control__icon {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__center {
    position: relative;
    @include flex();
    width: 100%;

    &__prefix {
      flex: none;
      width: auto;
      @include padding(0 0 0 8px);
      @include form-font();
      @include flex(center);
      color: $c-grey;
    }

    &__main {
      flex: 1;
      @include padding(0px 8px);
    }

    &__suffix {
      flex: none;
      width: auto;
      @include padding(0 8px 0 0);
      @include form-font();
      @include flex(center);
    }

    &__control {
      flex: none;
      width: auto;
      @include padding(0px 8px);
      @include form-font();
      @include flex(center);
      position: relative;

      &::before {
        content: '';
        width: 1px;
        height: 14px;
        display: inline-block;
        @include position(tl, 50%, 0);
        transform: translateY(-50%);
      }

      &__icon {
        width: 20px;
        cursor: pointer;
      }
    }

    &__remove {
      @include position(tr, 50%, 10px);
      transform: translateY(-50%);
      cursor: pointer;
      @include flex(center);

      &__icon {
        width: 20px;
      }
    }
  }
}

.re-input-native-field {
  @include form-font();
  background-color: transparent;
  border: 0px;
  outline: 0px;
  width: 100%;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
}
</style>
