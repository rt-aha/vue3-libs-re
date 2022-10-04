<template>
  <div class="re-email-auto-complete">
    <div class="re-email-auto-complete__input" v-click-away="closeOptions">
      <re-input
        v-model="emailValue"
        @click.stop
        @input="(e) => updateValue(e, 'input')"
        @change="(e) => updateValue(e, 'change')"
        @keydown="handleKeydown"
        :value="modelValue"
        :placeholder="$attrs.placeholder"
      />
      <!-- @focus="expandOptions" -->
    </div>
    <div class="re-email-auto-complete-expand">
      <ReCollapseTransition :show="isExpand">
        <div class="re-email-auto-complete__option__content">
          <ul class="re-email-auto-complete__option__content__list">
            <li
              class="re-email-auto-complete-option"
              :class="[
                {
                  're-email-auto-complete-option--active': keyboardIndex === idx,
                  're-email-auto-complete-option--disabled': opt.disabled,
                },
              ]"
              @click="handleSelect(opt.value)"
              v-for="(opt, idx) of extraOptions"
              :key="opt.value"
              v-bind="opt"
            >
              <component v-if="opt.render" :is="render()" v-bind="opt.optionConfig" />
              <span v-else class="re-email-auto-complete-option__item">{{ opt.label }}</span>
              <span
                v-show="opt.allowedDelete"
                class="re-email-auto-complete-option__remove"
                :allowedDelete="opt.allowedDelete"
                @click.stop="removeOption(opt.value)"
                >刪除</span
              >
            </li>
          </ul>
        </div>
      </ReCollapseTransition>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import ReInput from '@/components/dataInput/ReInput.vue';
import ReCollapseTransition from '@/components/utility/ReCollapseTransition.vue';
import ReCategoryTitle from '@/components/dataInput/ReCategoryTitle.vue';
import useValidate from '@/hooks/useValidate';

const domainList = [
  {
    value: 'gmail.com',
    label: 'gmail.com',
  },
  {
    value: 'yahoo.com.tw',
    label: 'yahoo.com.tw',
  },
  {
    value: 'hotmail.com',
    label: 'hotmail.com',
  },
];

export default defineComponent({
  name: 'ReEmailAutoComplete',
  components: {
    ReInput,
    ReCollapseTransition,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: domainList,
    },
    storageKey: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { validFn } = useValidate();
    const isExpand = ref(false);
    const visible = ref(false);
    const emailValue = ref('');
    const extraOptions = ref([]);
    const emailDomains = ref([]);
    const isBlur = ref(false);
    const isFocus = ref(true);
    const keyboardIndex = ref(0);

    const setValue = () => {
      emailValue.value = props.modelValue;
    };
    const closeOptions = () => {
      isExpand.value = false;
    };
    const handleSelect = (selectedValue) => {
      let fullEmail = '';

      if (emailValue.value.indexOf('@') > -1) {
        const account = emailValue.value.split('@')[0];
        fullEmail = `${account}@${selectedValue}`;
      } else {
        fullEmail = `${emailValue.value}@${selectedValue}`;
      }

      emailValue.value = fullEmail;
      emit('update:modelValue', emailValue.value);
      // this.triggerValidate('change', emailValue.value);
      setOptions();
      closeOptions();
    };
    const removeOption = (val) => {
      const storageOptions = localStorage.getItem(props.storageKey);
      if (!storageOptions) return;

      const emailOptions = JSON.parse(storageOptions);

      // 要移除的 domain
      const filterOptions = emailOptions.filter((item) => item.value !== val);

      if (filterOptions.length === 0) {
        localStorage.removeItem(props.storageKey);
      } else {
        localStorage.setItem(props.storageKey, JSON.stringify(filterOptions));
      }

      combineEmailDomains();
    };
    const expandOptions = () => {
      if (!emailValue.value || emailValue.value.split('@').length !== 2) {
        isExpand.value = false;
        return;
      }

      isExpand.value = true;
    };
    const handleKeydown = (e) => {
      if (e.keyCode === 40) {
        keyboardIndex.value += 1;
        if (keyboardIndex.value >= extraOptions.value.length) {
          keyboardIndex.value = 0;
        }
      }

      if (e.keyCode === 38) {
        keyboardIndex.value -= 1;
        if (keyboardIndex.value === -1) {
          keyboardIndex.value = extraOptions.value.length - 1;
        }
      }

      if (e.keyCode === 13 && isExpand.value) {
        handleSelect(extraOptions.value[keyboardIndex.value].value);
      }
    };

    const updateValue = (e, event) => {
      const val = e.target.value;
      emit('update:modelValue', val);
      validFn(event);
      // this.triggerValidate('input', value);

      if (props.disabled) return;

      // 沒有值或是沒有小老鼠分割沒有兩個值，不開啟
      if (!val || emailValue.value.split('@').length !== 2) {
        isExpand.value = false;
        return;
      }

      const mappingObj = extraOptions.value.find((item) => item.label.includes(val));

      // 若有 mapping 到 部分相同的字段
      if (mappingObj) {
        // 但 長度不同，則顯示
        const isMoreLength = val > mappingObj.label;

        if (mappingObj && isMoreLength) {
          isExpand.value = false;
          return;
        }
      } else {
        // 若 mapping 不到部分相同的字段
        isExpand.value = false;
        return;
      }

      isExpand.value = true;
    };
    const combineEmailDomains = () => {
      emailDomains.value = props.options;

      const storageOptions = localStorage.getItem(props.storageKey);

      if (storageOptions) {
        let emailOptions = JSON.parse(storageOptions);
        emailOptions = emailOptions.map((item) => {
          item.allowedDelete = true;
          return item;
        });

        const frequentTitle = {
          render: () => ReCategoryTitle,
          label: 'frequentTitle',
          value: '111', // 只是一個隨機 id，渲染用
          title: '常用 Email',
          disabled: true,
        };

        const historyTitle = {
          render: () => ReCategoryTitle,
          label: 'historyTitle',
          value: '222', // 只是一個隨機 id，渲染用
          title: '曾使用 Email',
          disabled: true,
        };

        emailDomains.value = [frequentTitle, ...this.options, historyTitle, ...emailOptions];
      }

      setOptions();
    };
    const setOptions = () => {
      const [account, domain] = emailValue.value.split('@');

      extraOptions.value = emailDomains.value.map((item) => {
        item.label = `${account}@${item.value}`;
        return item;
      });

      if (domain) {
        const isMatchDomain = emailDomains.value.some((item) => item.value.includes(domain));

        if (isMatchDomain) {
          extraOptions.value = extraOptions.value.filter((item) => item.value.includes(domain));
        }
      }
    };

    setValue();
    combineEmailDomains();

    watch(emailValue, (newVal, oldVal) => {
      if (newVal.length !== oldVal.length) {
        setOptions();
      }
    });

    return {
      isExpand,
      visible,
      emailValue,
      extraOptions,
      emailDomains,
      isBlur,
      isFocus,
      keyboardIndex,
      setValue,
      closeOptions,
      handleSelect,
      removeOption,
      expandOptions,
      handleKeydown,
      updateValue,
      combineEmailDomains,
      setOptions,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-email-auto-complete {
  position: relative;
  width: 100%;

  &__input {
    width: 100%;
    cursor: pointer;

    &__field {
      @include padding(10px);
      width: 100%;
      background: $c-white;
      border: 2px solid $c-main;
      border-radius: 10px;
    }
  }

  &__option {
    @include position(tl, 100%, 0);
    z-index: 100;
    margin-top: 5px;
    background-color: $c-white;
    border: 1px solid $c-main;
    border-radius: 4px;
    overflow: hidden;

    &__content {
      position: relative;
      height: auto;
      max-height: 200px;
      overflow: auto;
    }
  }
}

.re-email-auto-complete-expand {
  @include position(tl, calc(100% + 5px), 0);
  background-color: $c-white;
  width: 100%;
  z-index: 100;
}

.re-email-auto-complete-option {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  @include font-style($c-black, 14px);
  @include padding(10px);
  position: relative;

  &:not([data-disabled-status='true']) {
    &:hover {
      background-color: rgba($c-main, 0.2);
    }
  }

  &--disabled {
    cursor: not-allowed;
  }

  &--active {
    background-color: rgba($c-main, 0.2);
  }

  &__remove {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    @include font-style($c-error, 14px);
    cursor: pointer;
  }
}
</style>
