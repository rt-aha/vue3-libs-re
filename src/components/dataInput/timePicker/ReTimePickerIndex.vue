<template>
  <div class="re-time-picker">
    <ReInput v-model="timeString" placeholder="請選擇時間" readonly @click.stop="openTimeList" />
    <div class="time-list-wrapper">
      <ReCollapseTransition :show="visible">
        <div v-click-away="closeTimeList">
          <ReTimeList ref="timelistRef" :value="innerValue" @updateTime="handleInput" />
        </div>
      </ReCollapseTransition>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import ReTimeList from '@/components/dataInput/timePicker/ReTimeList.vue';
import ReCollapseTransition from '@/components/utility/ReCollapseTransition.vue';
import ReInput from '@/components/dataInput/ReInput.vue';

const props = defineProps({
  modelValue: {
    type: Date,
    default: () => new Date(),
  },
});
const emit = defineEmits(['update:modelValue']);

const innerValue = ref(new Date());
const timeString = ref('');
const visible = ref(false);
const timelistRef = ref(null);

const handleInput = (value) => {
  emit('update:modelValue', value);
  // this.triggerValidate('change', value);
};
const closeTimeList = () => {
  visible.value = false;
};
const openTimeList = () => {
  visible.value = true;
  timelistRef.value.splitTime();
};
const setInnerValue = () => {
  innerValue.value = props.modelValue;
};
const setTimeString = () => {
  timeString.value = dayjs(innerValue.value).format('HH:mm:ss');
};

setInnerValue();
setTimeString();

watch(
  () => props.modelValue,
  () => {
    setInnerValue();
    setTimeString();
  },
);
</script>

<style lang="scss" scoped>
.re-time-picker {
  position: relative;
}

.time-list-wrapper {
  @include position(tl, calc(100% + 5px), 0);
  z-index: 100;
  width: 100%;
  background-color: $c-white;
  border-radius: 5px;
}
</style>
