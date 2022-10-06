<template>
  <div class="re-countdown">
    Countdown {{ btnText }}

    <button @click="handleClick">
      btn
    </button>
  </div>
</template>

<script setup>
import cloneRegExp from 'lodash-es/_cloneRegExp';
import { onMounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  btnName: {
    type: String,
    default: '發送',
  },
  sendBtnWidth: {
    type: [String, Number],
    default: '80',
  },
  timeLength: {
    type: [String, Number],
    default: 30,
  },
  api: {
    type: Function,
    default: () => {},
  },
  timerKey: {
    type: String,
    default: 'timer',
  },
});

const innerValue = ref('');
const btnText = ref('');
const timer = ref(null);
const disabled = ref(false);
const totalTime = ref(60);
const isLoading = ref(false);

const setDisabled = (status) => {
  disabled.value = status;
};

const setBtnText = (type = 'init', val) => {
  if (type === 'init') {
    btnText.value = props.btnName;
    return;
  }

  btnText.value = val;
};

const saveStartRecord = () => {
  localStorage.setItem(props.timerKey, Date.now());
};
const removeStartRecord = () => {
  localStorage.removeItem(props.timerKey, Date.now());
};

const setTotalTime = (type = 'init', value) => {
  if (type === 'init') {
    totalTime.value = Number(props.timeLength) + 1;
    return;
  }
  totalTime.value = value;
};

const endTimer = () => {
  clearTimeout(timer.value);
  timer.value = null;
  setTotalTime();
  removeStartRecord();
  setBtnText();
};

const handleTimer = () => {
  timer.value = setTimeout(() => {
    totalTime.value += -1;

    setBtnText('', `${totalTime.value}s`);

    if (totalTime.value === 0) {
      setDisabled(false);
      endTimer();
    }
    else {
      handleTimer();
    }
  }, 1000);
};

const initTimer = () => {
  setDisabled(false);

  removeStartRecord();

  setBtnText();
};
const continueTimer = () => {
  const lastRecord = localStorage.getItem(props.timerKey);
  const duration = Number(((Date.now() - Number(lastRecord)) / 1000).toFixed());

  if (lastRecord && duration <= 59) {
    const remainSeconds = 60 - duration;
    setTotalTime('', remainSeconds);
    setDisabled(true);
    handleTimer();

    return;
  }

  initTimer();
};

const startTimer = () => {
  setTotalTime();
  saveStartRecord();
  handleTimer();
};

const handleClick = async () => {
  setDisabled(true);
  isLoading.value = true;

  try {
    await props.api();
    startTimer();
  }
  catch (e) {

  }
  isLoading.value = false;
};

onMounted(() => {
  continueTimer();
});
</script>

<style lang="scss" scoped>
</style>
