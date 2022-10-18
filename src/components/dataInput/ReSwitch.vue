<template>
  <div
    class="re-switch"
    :class="{
      're-switch--active': modelValue,
      're-switch--disabled': disabled,
    }"
    :style="{
      ...reSwitchStyle,
      ...statusColor,
    }"
  >
    <input :id="uuid" class="re-switch__field" type="checkbox" :value="activeStatus" @change="handleChange">
    <label class="re-switch-box" :for="uuid">
      <!-- <div class="bar-wrap"> -->
      <div class="re-switch-box__bar" :style="reSwitchBarStyle">
        <span class="label-text label-text--on" :style="labelTextWidth">{{ switchLabel.on }}</span>
        <span class="label-text label-text--off" :style="labelTextWidth">{{ switchLabel.off }}</span>
      </div>
      <!-- </div> -->
    </label>
  </div>
</template>

<script setup>
import useValidate from '@/hooks/useValidate';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  switchLabel: {
    type: Object,
    default: () => ({
      on: '',
      off: '',
    }),
  },
  src: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    validator: val => ['small', 'default', 'large', 'custom'].includes(val),
    default: 'default',
  },
  customSize: {
    type: String,
    default: '',
  },
  color: {
    type: Object,
    default: () => ({
      on: '',
      off: '',
    }),
  },
});
const emit = defineEmits(['update:modelValue']);
const uuid = nanoid();
// 這裡設定的是高度
const sizeMapping = {
  small: '20px',
  default: '26px',
  large: '32px',
  custom: props.customSize,
};

// 定義整體寬高
const reSwitchStyle = computed(() => {
  let size = props.size;

  if (props.customSize) {
    size = 'custom';
  }

  const sizeNum = sizeMapping[size].replace('px', '');

  return {
    'width': props.width || `${sizeNum * 2}px`,
    'height': sizeMapping[size],
    'border-radius': `${sizeNum * 2}px`,
  };
});

// 定義滑動圓圈寬高與 active 時的位移
const reSwitchBarStyle = computed(() => {
  let size = props.size;

  if (props.customSize) {
    size = 'custom';
  }

  const sizeNum = sizeMapping[size].replace('px', '');

  const leftValue = () => {
    if (props.modelValue) {
      if (props.width) {
        const w = props.width.replace('px', '');

        return `${w - sizeNum}px`;
      }

      return `${sizeNum * 2 - sizeNum}px`;
    }

    return '0';
  };

  return {
    'width': `${sizeNum - 4}px`,
    'height': `${sizeNum - 4}px`,
    'border-radius': `${sizeNum / 2}px`,
    'left': leftValue(),
  };
});

// 計算帶字段的時的標籤寬度
const labelTextWidth = computed(() => {
  const swithWidth = Number(reSwitchStyle.value.width.replace('px', ''));
  const sizeNum = Number(reSwitchBarStyle.value.width.replace('px', ''));
  const halfOfRadius = Number(reSwitchBarStyle.value['border-radius'].replace('px', '')) / 2;

  return {
    // 總寬度 - 球直徑 - .label-text偏移 2px 與邊界和圈圈之間的 2px - 圓角一半(沒扣掉這個會感覺跑版)
    width: `${swithWidth - sizeNum - 4 - halfOfRadius}px`,
  };
});

// 定義背景色

const statusColor = computed(() => {
  if (props.modelValue) {
    return {
      'background-color': props.color.on || '#32CD32',
    };
  }

  return {
    'background-color': props.color.off || '#ccc',
  };
});

const { validFn } = useValidate();
const handleChange = (e) => {
  if (props.disabled) { return; }
  emit('update:modelValue', e.target.value !== 't');
  validFn('change');
};

const activeStatus = computed(() => {
  return props.modelValue ? 't' : 'f';
});
</script>

<style lang="scss" scoped>
.re-switch {
  /* width: 50px;
  height: 24px;
  border-radius: 50%; */
  background-color: $c-switch--off;
  @include padding(2px);
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  overflow: hidden;

  &--active {
    background-color: $c-switch--active;

    .re-switch-box {
      display: inline-block;

      &__bar {
        /* left: 26px; */

        /* transform: translateX(26px); */
      }
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;

    .re-switch-box {
      cursor: not-allowed;
    }
  }

  &__field {
    display: none;
  }
}

.re-switch-box {
  width: 100%;

  /* height: 20px; */
  position: relative;
  cursor: pointer;

  &__bar {
    border-radius: 10px;
    background-color: $c-white;
    transition: 0.3s;
    position: relative;
    z-index: 10;
    left: 0;
  }
}

.label-text {
  display: inline-block;
  text-align: center;
  color: $c-white;

  &--on {
    @include position(tl, 50%, 0);
    transform: translate(calc(-100% - 2px), -50%);
  }

  &--off {
    @include position(tr, 50%, 0);
    transform: translate(calc(100% + 2px), -50%);
  }
}

.on-label {
  width: 24px;
  text-align: center;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%) scale(0.8);
  @include font-style($c-white, 12px);
  z-index: 5;
}

.off-label {
  width: 24px;
  text-align: center;
  display: inline-block;
  position: absolute;
  top: 50%;
  right: 2px;
  transform: translateY(-50%) scale(0.8);
  @include font-style($c-white, 12px);
  z-index: 5;
}
</style>
