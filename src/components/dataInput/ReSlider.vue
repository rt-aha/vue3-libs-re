<template>
  <div class="re-slider">
    <div
      ref="sliderBarRef"
      class="slider-wrap"
      @mouseover="handleMouseOver"
      @mouseup="handleMouseLeaveSlider"
      @mouseleave="handleMouseLeaveSlider"
      @click="handleClick"
    >
      <div class="slider-static" />

      <template v-if="markList">
        <div
          v-for="m of markList" :key="m.position" class="slider-mark"
          :class="{ 'slider-mark--is-limit': m.isLimit }"
          :style="{ left: `${m.position}%` }" :data-label="m.label" :data-value="m.value" @click.stop="setToMarkPosition(m.position)"
        />
      </template>

      <div v-if="range" class="slider-line" :style="{ 'clip-path': `polygon(${positionPersentage[0]}% 0%, ${positionPersentage[1]}% 0%, ${positionPersentage[1]}% 100%, ${positionPersentage[0]}% 100%)` }" />
      <div v-else class="slider-line" :style="{ 'clip-path': `polygon(0% 0%, ${positionPersentage}% 0%, ${positionPersentage}% 100%, 0% 100%)` }" />
      <div
        class="slider-dot" :style="{ left: `${range ? positionPersentage[0] : positionPersentage}%` }"
        @mousedown.stop="(e) => handleMouseDown(e, 'dot1')"
      >
        <ReTooltip v-if="tooltip" :label="getLabel(0)">
          <div class="slider-dot__real" />
        </ReTooltip>
        <div v-else class="slider-dot__real" />
      </div>
      <div
        v-if="range" class="slider-dot"
        :style="{ left: `${positionPersentage[1]}%` }" @mousedown.stop="(e) => handleMouseDown(e, 'dot2')"
      >
        <ReTooltip v-if="tooltip" :label="getLabel(1)">
          <div class="slider-dot__real" />
        </ReTooltip>
        <div v-else class="slider-dot__real" />
      </div>
    </div>
  </div>
</template>

<script setup>
import useValidate from '@/hooks/useValidate';
import ReTooltip from '@/components/feedback/ReTooltip.vue';

const props = defineProps({
  modelValue: {
    type: [Number, Array],
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
  showLimit: {
    type: Boolean,
    default: false,
  },
  limitMarks: {
    type: Boolean,
    default: false,
  },
  range: {
    type: Boolean,
    default: false,
  },
  formatShowValue: {
    type: Function,
    default: val => val,
  },
});
const emit = defineEmits(['update:modelValue']);
const { validFn } = useValidate();

const isMouseDown1 = ref(false);
const isMouseDown2 = ref(false);
const currDot = ref('');
const sliderBarRef = ref(null);
const innerValue = ref(props.modelValue);

const positionPersentage = computed(() => {
  return innerValue.value;
});

const getLabel = (index) => {
  if (props.range) {
    return props.formatShowValue(positionPersentage.value[index]);
  }

  return props.formatShowValue(positionPersentage.value);
};

const markList = computed(() => {
  if (!props.marks && !props.showLimit) {
    return null;
  }

  const mappingMarksToList = (setting, isLimit = true) => {
    const keys = Object.keys(setting);

    const list = keys.map((key) => {
      return {
        position: key,
        value: props.formatShowValue(key),
        label: setting[key],
        isLimit,
      };
    });

    return list;
  };

  const defaultLimit = {
    0: '',
    100: '',
  };

  if (props.showLimit && props.marks) {
    return [...mappingMarksToList(defaultLimit), ...mappingMarksToList(props.marks, false)];
  }

  if (props.showLimit) {
    return mappingMarksToList(defaultLimit);
  }

  return mappingMarksToList(props.marks, false);
});

const updateValue = () => {
  //
  if (props.range) {
    const sortValue = innerValue.value.sort();
    emit('update:modelValue', sortValue);
  }
  else {
    emit('update:modelValue', Number(innerValue.value));
  }
  validFn('change');
};

const proofreadMarkOnCorrectPosition = () => {
  const markKeys = Object.keys(props.marks);
  const isOnMarkPosition = markKeys.includes(String(innerValue.value));

  if (isOnMarkPosition) {
    return;
  }

  let min = 101;
  const numValue = innerValue.value;
  for (const key of markKeys) {
    const absNum = Math.abs(numValue - Number(key));
    if (absNum < min) {
      min = absNum;
      innerValue.value = Number(key);
    }
  }

  updateValue();
};

const proofreadRangeMarkOnCorrectPosition = () => {
  const markKeys = Object.keys(props.marks);
  let [startPoint, endPoint] = innerValue.value;
  const isOnMarkPosition0 = markKeys.includes(String(startPoint));
  const isOnMarkPosition1 = markKeys.includes(String(endPoint));

  if (isOnMarkPosition0 && isOnMarkPosition1) {
    return;
  }

  if (!isOnMarkPosition0) {
    let min = 101;
    const numValue = startPoint;
    for (const key of markKeys) {
      const absNum = Math.abs(numValue - Number(key));

      if (absNum < min) {
        min = absNum;
        startPoint = Number(key);
        innerValue.value = [startPoint, endPoint];
      }
    }
  }

  if (!isOnMarkPosition1) {
    let min = 101;
    const numValue = endPoint;
    for (const key of markKeys) {
      const absNum = Math.abs(numValue - Number(key));
      if (absNum < min) {
        min = absNum;
        innerValue.value = [startPoint, Number(key)];
      }
    }
  }

  updateValue();
};

const proofreadPoint = () => {
  if (props.limitMarks) {
    if (props.range) {
      proofreadRangeMarkOnCorrectPosition();
    }
    else {
      proofreadMarkOnCorrectPosition();
    }
  }

  // updateValue();
};

const formatValueAndUpdate = (postiveInteger) => {
  if (props.range) {
    if (currDot.value === 'dot1') {
      const [, b] = innerValue.value;
      innerValue.value = [postiveInteger, b];
    }
    if (currDot.value === 'dot2') {
      const [a] = innerValue.value;
      innerValue.value = [a, postiveInteger];
    }
  }
  else {
    innerValue.value = postiveInteger;
    updateValue();
  }
};

const calcSliderBarOffset = (e, action) => {
  // 點擊位置與左邊界的 x 距離
  const { clientX } = e;
  // progressBar 資訊
  const eleInfoBox = sliderBarRef.value.getBoundingClientRect();
  // 進度條與左邊界的距離
  const leftOffset = sliderBarRef.value.getBoundingClientRect().left;
  // 進度條的長度
  const progressBarLength = eleInfoBox.width;
  // 點擊位置在進度條的百分比
  const clickPersentage = (clientX - leftOffset) / progressBarLength;

  const postiveInteger = Math.round(clickPersentage * 100);

  if (action === 'move') {
    formatValueAndUpdate(postiveInteger);
  }

  return postiveInteger;
};

const handleMouseDown = (e, dot) => {
  currDot.value = dot;
  if (currDot.value === 'dot1') {
    isMouseDown1.value = true;
  }

  if (currDot.value === 'dot2') {
    isMouseDown2.value = true;
  }
  calcSliderBarOffset(e, 'move');
};

const handleMouseOver = (e) => {
  // 滑鼠壓著的情況下移動
  if (isMouseDown1.value || isMouseDown2.value) {
    calcSliderBarOffset(e, 'move');
  }
};

const setToMarkPosition = (position) => {
  if (props.range) {
    const startPointDiff = Math.abs(position - innerValue.value[0]);
    const endPointDiff = Math.abs(position - innerValue.value[1]);

    if (endPointDiff > startPointDiff) {
      innerValue.value = [position, innerValue.value[1]];
    }
    else {
      innerValue.value = [innerValue.value[0], position];
    }

    return;
  }

  innerValue.value = position;
  proofreadPoint();
};

const handleMouseLeaveSlider = () => {
  //
  if (currDot.value === 'dot1') {
    isMouseDown1.value = false;
  }

  if (currDot.value === 'dot2') {
    isMouseDown2.value = false;
  }

  proofreadPoint();
};

const handleClick = (e) => {
  // if (props.range) {
  const clickPosition = calcSliderBarOffset(e, 'click');

  setToMarkPosition(clickPosition);
  // }

  if (props.limitMarks) {
    proofreadPoint();
  }

  // handleMouseLeaveSlider();
};

const init = () => {
  innerValue.value = props.modelValue;
  proofreadPoint();
};

init();
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
  // transition: 0.3s;

}

.slider-dot {
  @include position(tl, 50%, 50%);
  transform: translate(-50%, -50%);
  // transition: 0.3s;

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
    content: attr(data-value);
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

  &--is-limit {
    // visibility: hidden;
    background-color: transparent;

    &:hover {
      transform: translate(-50%, -50%) scale(1);
      background-color: transparent;
      border: 0;
    }
  }

}

// *{
//   outline: 1px solid #f00
// }
</style>
