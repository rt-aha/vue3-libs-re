<template>
  <div class="re-slider">
    <div
      ref="volumeProgressBarEle"
      class="slider-wrap"
      @click="calcProgressBarOffset"
      @mousedown="handleMouseDown"
      @mouseover="handleMouseOver"
      @mouseup="handelMouseUp"
    >
      <div class="slider-static" />
      <div class="slider-line" :style="{ width: `${positionPersentage}%` }" />

      <div class="slider-dot" :style="{ left: `${positionPersentage}%` }">
        <ReTooltip v-if="tooltip" :label="positionPersentage.toString()">
          <div class="slider-dot__real" />
        </ReTooltip>
        <div v-else class="slider-dot__real" />
      </div>
      <template v-if="marks">
        <div v-for="m of markList" :key="m.position" class="slider-mark" :style="{ left: `${m.position}%` }" :data-label="m.label" :data-position="m.position" @click.stop="toMark(m.position)" />
      </template>
    </div>
  </div>
</template>

<script setup>
import useValidate from '@/hooks/useValidate';
import ReTooltip from '@/components/feedback/ReTooltip.vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  tooltip: {
    type: Boolean,
    default: false,
  },
  marks: {
    type: [Object, null],
    default: null,
  },
  limitMarks: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);
const { validFn } = useValidate();

const isMouseDown = ref(false);
const volumeProgressBarEle = ref(null);

const positionPersentage = computed(() => {
  return props.modelValue;
});

const innerValue = computed({
  get: () => {
    return props.modelValue;
  },
});

const markList = computed(() => {
  if (!props.marks) {
    return null;
  }

  const keys = Object.keys(props.marks);

  const mappingMarksToList = keys.map((key) => {
    return {
      position: key,
      label: props.marks[key],
    };
  });

  return mappingMarksToList;
});

const updateValue = (val) => {
  console.log(val);
  emit('update:modelValue', Number(val));
  validFn('change');
};

const calcProgressBarOffset = (e) => {
  if (props.limitMarks) { return; }
  // 點擊位置與左邊界的 x 距離
  const { clientX } = e;
  // progressBar 資訊
  const eleInfoBox = volumeProgressBarEle.value.getBoundingClientRect();
  // 進度條與左邊界的距離
  const leftOffset = volumeProgressBarEle.value.getBoundingClientRect().left;
  // 進度條的長度
  const progressBarLength = eleInfoBox.width;
  // 點擊位置在進度條的百分比
  const clickPersentage = (clientX - leftOffset) / progressBarLength;

  // musicVolume.value = clickPersentage;

  const postiveInteger = Math.round(clickPersentage * 100);
  updateValue(postiveInteger);
};

const toMark = (position) => {
  updateValue(position);
};

const handleMouseDown = (e) => {
  isMouseDown.value = true;
  calcProgressBarOffset(e);
};

const handleMouseOver = (e) => {
  // 滑鼠壓著的情況下移動
  if (isMouseDown.value) {
    calcProgressBarOffset(e);
  }
};

const handelMouseUp = () => {
  isMouseDown.value = false;
};
</script>

<style lang="scss" scoped>
.re-slider {
  width: auto;
}
.slider-wrap {
  @include flex(center);
  height: 18px;
  cursor: pointer;
  width: 100%;
  position: relative;

  // outline: 1px solid #00f;

}

.slider-static {
  background-color: $c-text1;
  height: 1px;
  width: 100%;
  @include position(center);
}

.slider-line {
  background-color: $c-deepblue;
  height: 2px;
  width: 100%;
  @include position(tl, 50%, 0);
  transform: translateY(-50%);
  transition: 0.3s;

}

.slider-dot {
  @include position(tl, 50%, 50%);
  transform: translate(-50%, -50%);
  transition: 0.3s;

  &__real {
    @include circle(10px);
  background-color: $c-deepblue;

  }
}

.slider-mark {
  @include position(tl, 50%, 50%);
  transform: translate(-50%, -50%);
  transition: 0.3s;
  @include circle(4px);
  background-color: $c-deepblue;

  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
    background-color: $c-white;
    border: 2px solid $c-deepblue;
  }

  &::before {
    content: attr(data-position);
    @include position(tl, -20px, 50%);
    transform: translateX(-50%);
    @include font-style($c-black, 14);
  }

  &::after {
    content: attr(data-label);
    @include position(tl, calc(100% + 10px), 50%);
    transform: translateX(-50%);
    @include font-style($c-grey, 12);
    white-space: nowrap;
  }

}

// *{
//   outline: 1px solid #f00
// }
</style>
