<template>
  <div class="re-time-picker">
    <re-input v-model="timeString" placeholder="請選擇時間" readonly @click.stop="openTimeList" />
    <re-collapse-transition :show="visible">
      <div v-click-away="closeTimeList">
        <re-time-list :value="innerValue" @input="handleInput" ref="timelist" />
      </div>
    </re-collapse-transition>
  </div>
</template>

<script>
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
    value: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      innerValue: new Date(),
      timeString: '',
      visible: false,
    };
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value);
      // this.triggerValidate('change', value);
    },
    closeTimeList() {
      console.log('close?');
      this.visible = false;
    },
    openTimeList() {
      this.visible = true;
      this.$refs.timelist.splitTime();
    },
    setInnerValue() {
      this.innerValue = this.value;
    },
    setTimeString() {
      this.timeString = dayjs(this.innerValue).format('HH:mm:ss');
    },
  },
  created() {
    this.setInnerValue();
    this.setTimeString();
  },
  watch: {
    value: {
      handler() {
        this.setInnerValue();
        this.setTimeString();
      },
    },
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
