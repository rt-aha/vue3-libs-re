<template>
  <div class="r-time-list">
    <div class="time-list">
      <div ref="tlh" class="time-list__col time-list__hour" @scroll="setPositionDebounce('tlh')">
        <span v-for="(h, index) of timeList.h" :key="h + index" class="time-list__col__item time-list__hour__item">
          {{ h }}
        </span>
      </div>
      <div ref="tlm" class="time-list__col time-list__minute" @scroll="setPositionDebounce('tlm')">
        <span v-for="(m, index) of timeList.m" :key="m + index" class="time-list__col__item time-list__minute__item">
          {{ m }}
        </span>
      </div>
      <div ref="tls" class="time-list__col time-list__second" @scroll="setPositionDebounce('tls')">
        <span v-for="(s, index) of timeList.s" :key="s + index" class="time-list__col__item time-list__second__item">
          {{ s }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { h, m, s } from './timeListConfig';

const props = defineProps({
  value: {
    type: Date,
    default: new Date(),
  },
});
const emit = defineEmits(['updateTime']);

const instance = getCurrentInstance();

const tlh = ref(null);
const tlm = ref(null);
const tls = ref(null);
const isInit = ref(false);
const timeList = reactive({
  h,
  m,
  s,
});

const timeValue = ref({
  h: '00',
  m: '00',
  s: '00',
  time() {
    return `${this.h}:${this.m}:${this.s}`;
  },
});

const validTimeFormat = (time) => {
  const timeRegExp = /^\d{2}:\d{2}:\d{2}$/;
  const isValidTimeFormat = timeRegExp.test(time);

  return isValidTimeFormat;
};

const setScrollBarPosition = () => {
  tlh.value.scrollTop = Number(timeValue.value.h) * 30;
  tlm.value.scrollTop = Number(timeValue.value.m) * 30;
  tls.value.scrollTop = Number(timeValue.value.s) * 30;
};

// 外層呼叫
const splitTime = () => {
  const t = dayjs(props.value).format('HH:mm:ss');

  const hms = t.split(':');
  timeValue.value = {
    h: hms[0],
    m: hms[1],
    s: hms[2],
    time() {
      return `${this.h}:${this.m}:${this.s}`;
    },
  };

  nextTick(() => {
    setScrollBarPosition();
  });
};

const calcTimeValue = (calcType, targetPosition) => {
  const changeType = calcType.substr(2, 1);
  let updateTimeValue = targetPosition / 30;
  if (updateTimeValue < 10) {
    updateTimeValue = `0${String(updateTimeValue)}`;
  }
  else {
    updateTimeValue = String(updateTimeValue);
  }

  timeValue.value[changeType] = updateTimeValue;
  const fullTimeFormat = timeValue.value.time();

  const isValidTimeFormat = validTimeFormat(fullTimeFormat);

  const today = dayjs().format('YYYY-MM-DD');
  const ymd = today.split('-');
  const hms = fullTimeFormat.split(':');
  const time = new Date(ymd[0], ymd[1], ymd[2], hms[0], hms[1], hms[2]);

  if (isValidTimeFormat) {
    emit('updateTime', time);
  }
};

const calcHourScrollBarPosition = (calcType) => {
  const scrollBarPosition = instance.ctx.$refs[calcType].scrollTop;

  if (scrollBarPosition / 30 !== 0) {
    const remainder = scrollBarPosition % 30;
    let offsetBase = Math.floor(scrollBarPosition / 30);
    if (remainder > 15) {
      offsetBase += 1;
    }

    const targetPostion = offsetBase * 30;
    instance.ctx.$refs[calcType].scrollTop = targetPostion;

    calcTimeValue(calcType, targetPostion);
    return;
  }

  calcTimeValue(calcType, scrollBarPosition);
};

const setPositionDebounce = debounce((calcType) => {
  calcHourScrollBarPosition(calcType);
}, 100);
</script>

<style lang="scss" scoped>
$item-height: 30px;

.r-time-list {
  background-color: $c-white;
}

.time-list {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  width: 100%;
  height: $item-height * 7;

  &::before {
    position: absolute;
    top: $item-height * 3;
    left: 50%;
    width: 100%;
    height: 1px;
    content: "";
    background-color: $c-form-assist;
    transform: translateX(-50%);
  }

  &::after {
    position: absolute;
    top: $item-height * 4 - 1;
    left: 50%;
    width: 100%;
    height: 1px;
    content: "";
    background-color: $c-form-assist;
    transform: translateX(-50%);
  }

  &__col {
    display: inline-block;
    flex: 1;
    height: 100%;
    overflow-y: auto;
    font-size: 0;
    vertical-align: top;

    &__item {
      @include font-style($c-form-main, 14);
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: $item-height;
      text-align: center;
    }
  }

  &__minute {
    box-sizing: border-box;
    width: $item-height * 2;
    border-right: 1px solid $c-form-assist;
    border-left: 1px solid $c-form-assist;
  }
}
</style>
