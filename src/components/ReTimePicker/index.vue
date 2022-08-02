<template>
  <div class="re-time-picker">
    <re-input v-model="timeString" placeholder="請選擇時間" readonly @click.stop="openTimeList" />
    <re-collapse-transition :show="visible">
      <div v-click-away="closeTimeList">
        <re-time-list :value="innerValue" @updateTime="handleInput" ref="timelistRef" />
      </div>
    </re-collapse-transition>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import dayjs from 'dayjs';
import ReTimeList from '@/components/ReTimePicker/ReTimeList.vue';
import ReCollapseTransition from '@/components/ReCollapseTransition.vue';
import ReInput from '@/components/ReInput.vue';

export default {
  name: 'ReTimePicker',
  components: {
    ReTimeList,
    ReCollapseTransition,
    ReInput,
  },
  // mixins: [triggerValidate],
  props: {
    modelValue: {
      type: Date,
      default: () => new Date(),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
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

    return {
      innerValue,
      timeString,
      visible,
      timelistRef,
      handleInput,
      closeTimeList,
      openTimeList,
      setInnerValue,
      setTimeString,
    };
  },
};
</script>

<style lang="scss" scoped>
.re-time-picker {
  position: relative;
}
.time-list-wrapper {
  @include position(tl, 0, 30px);
  z-index: 100;
}
</style>
