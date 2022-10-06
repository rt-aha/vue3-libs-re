<template>
  <span>{{ btnText }}
  </span>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  btnName: {
    type: String,
    default: '開始',
  },
  timeLength: {
    type: [String, Number],
    default: 60,
  },
  api: {
    type: Function,
    default: () => {},
  },
  timerKey: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['countStart', 'countEnd', 'apiSent', 'apiError']);

const btnText = ref('-');
const timer = ref(null);
const disabled = ref(false);
const totalTime = ref(60);

const key = props.timerKey ? props.timerKey : customAlphabet('1234567890abcdef', 10)();
const timerKey = ref(key);

const emitEvent = (eventName, data) => {
  emit(eventName, timerKey.value, data);
};

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
  localStorage.setItem(timerKey.value, Date.now());
};
const removeStartRecord = () => {
  localStorage.removeItem(timerKey.value, Date.now());
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
  emitEvent('countEnd');
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

  if (lastRecord && duration <= (props.timeLength - 1)) {
    const remainSeconds = props.timeLength - duration;
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

const getTimerKey = () => {
  return timerKey.value;
};

const triggerTimer = async () => {
  if (disabled.value) { return; }
  setDisabled(true);

  try {
    if (props.api) {
      const res = await props.api();

      emitEvent('apiSent', res);
    }
    startTimer();
    emitEvent('countStart');
  }
  catch (e) {
    emitEvent('apiError', e);
  }

  // const key = await getTimerKey();
  // return key;

  return timerKey.value;
};

onMounted(() => {
  continueTimer();
});

defineExpose({
  triggerTimer,
});
</script>

<style lang="scss" scoped>
</style>
