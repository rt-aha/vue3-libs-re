<template>
  <div class="re-email-auto-complete">
    <div v-click-away="closeExpand" class="re-email-auto-complete__input">
      <input
        v-model="emailValue"
        class="re-email-auto-complete__input__field"
        :placeholder="$attrs.placeholder"
        @click.stop
        @input="(e) => updateValue(e, 'input')"
        @change="(e) => updateValue(e, 'change')"
        @keydown="handleKeydown"
      >
      <!-- @focus="expandOptions" -->
    </div>
    <div class="re-email-auto-complete-expand">
      <ReCollapseTransition :show="isExpand">
        <div class="re-email-auto-complete__option__content">
          <ul class="re-email-auto-complete__option__content__list">
            <li
              v-for="(opt, idx) of filterOptions"
              :key="opt.value"
              class="re-email-auto-complete-option"
              :class="[
                {
                  're-email-auto-complete-option--active': keyboardIndex === idx,
                  're-email-auto-complete-option--disabled': opt.disabled,
                },
              ]"
              v-bind="opt"
              @click="handleSelect(opt.value)"
            >
              <component :is="render()" v-if="opt.render" v-bind="opt.optionConfig" />
              <span v-else class="re-email-auto-complete-option__item">{{ opt.label }}</span>
              <!-- <span
                v-show="opt.allowedDelete"
                class="re-email-auto-complete-option__remove"
                :allowedDelete="opt.allowedDelete"
                @click.stop="removeOption(opt.value)"
              >刪除</span> -->
            </li>
          </ul>
        </div>
      </ReCollapseTransition>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import ReInput from '@/components/dataInput/ReInput.vue';
import ReCollapseTransition from '@/components/utility/ReCollapseTransition.vue';
import ReCategoryTitle from '@/components/dataInput/ReCategoryTitle.vue';
import useValidate from '@/hooks/useValidate';

const props = defineProps({
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
    default: () => [
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
    ],
  },
  storageKey: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const { validFn } = useValidate();
const isExpand = ref(false);
const visible = ref(false);
const emailValue = ref('');
const filterOptions = ref([]);
const emailDomains = ref([]);
const isBlur = ref(false);
const isFocus = ref(true);
const keyboardIndex = ref(-1);

const init = () => {
  emailValue.value = props.modelValue;
  emailDomains.value = props.options;
};
const closeExpand = () => {
  isExpand.value = false;
};

const openExpand = () => {
  isExpand.value = true;
};

const setOptions = () => {
  const [account, domain] = emailValue.value.split('@');

  filterOptions.value = emailDomains.value.map((item) => {
    item.label = `${account}@${item.value}`;
    return item;
  });

  if (domain) {
    const isMatchDomain = emailDomains.value.some(item => item.value.includes(domain));

    if (isMatchDomain) {
      filterOptions.value = filterOptions.value.filter(item => item.value.includes(domain));
    }
  }
};

const handleSelect = (selectedValue) => {
  console.log('!?!!?');
  let fullEmail = '';

  if (emailValue.value.includes('@')) {
    const account = emailValue.value.split('@')[0];
    fullEmail = `${account}@${selectedValue}`;
  }
  else {
    fullEmail = `${emailValue.value}@${selectedValue}`;
  }

  emailValue.value = fullEmail;
  emit('update:modelValue', emailValue.value);

  closeExpand();
};

const handleKeydown = (e) => {
  // 下按鍵
  if (e.keyCode === 40) {
    keyboardIndex.value += 1;
    if (keyboardIndex.value >= filterOptions.value.length) {
      keyboardIndex.value = 0;
    }
  }

  // 上按鍵
  if (e.keyCode === 38) {
    keyboardIndex.value = 1;
    if (keyboardIndex.value === -1) {
      keyboardIndex.value = filterOptions.value.length - 1;
    }
  }

  if (e.keyCode === 13 && isExpand.value) {
    if (keyboardIndex.value === -1) {
      return;
    }

    handleSelect(filterOptions.value[keyboardIndex.value].value);
  }
};

const updateValue = (e, event) => {
  console.log('updata value');
  const val = e.target.value;
  emit('update:modelValue', val);
  validFn(event);
  // this.triggerValidate('input', value);

  if (props.disabled) { return; }
  if (val === '') {
    isExpand.value = false;
    return;
  }

  setOptions();

  const matchValue = filterOptions.value.some((item) => {
    return item.label === emailValue.value;
  });

  if (matchValue) {
    closeExpand();
    return;
  }

  openExpand();
};

init();

// watch(() => emailValue.value, (newVal, oldVal) => {
//   if (newVal.length !== oldVal.length) {
//     setOptions();
//   }
// });
</script>

<style lang="scss" scoped>
.re-email-auto-complete {
  position: relative;
  width: 100%;

  &__input {
    @include padding(5px 8px);
    @include flex();
    width: 100%;
    height: 36px;
    cursor: pointer;
    background: $c-white;
    border: 1px solid $c-form-assist;
    border-radius: 4px;

    &__field {
      width: 100%;
      background-color: transparent;
      border: 0;
      outline: 0;
    }
  }

  &__option {
    @include position(tl, 100%, 0);
    z-index: 100;
    margin-top: 5px;
    overflow: hidden;
    background-color: $c-white;
    border: 1px solid $c-form-assist;
    border-radius: 4px;

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
  z-index: 100;
  width: 100%;
  background-color: $c-white;
}

.re-email-auto-complete-option {
  @include font-style($c-black, 14px);
  @include padding(10px);
  position: relative;
  display: inline-block;
  width: 100%;
  cursor: pointer;

  &:not([data-disabled-status="true"]) {
    &:hover {
      background-color: rgba($c-deepblue, 0.2);
    }
  }

  &--disabled {
    cursor: not-allowed;
  }

  &--active {
    background-color: rgba($c-deepblue, 0.2);
  }

  &__remove {
    @include font-style($c-error, 14px);
    position: absolute;
    top: 50%;
    right: 10px;
    cursor: pointer;
    transform: translateY(-50%);
  }
}
</style>
