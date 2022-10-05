<template>
  <span :id="countId" ref="number" />
</template>

<script setup>
import CountUp from 'countup';
//

const props = defineProps({
  startVal: {
    type: Number,
    default: 0,
  },
  endVal: {
    type: Number,
    required: true,
  },
  decimals: {
    type: Number,
    default: 0,
  },
  delay: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 1,
  },
  useEasing: {
    type: Boolean,
    default: false,
  },
  useGroup: {
    type: Boolean,
    default: true,
  },
  separator: {
    type: String,
    default: ',',
  },
  decimal: {
    type: String,
    default: '.',
  },
  className: {
    type: String,
    default: '',
  },
});

let isStarted = false;
const number = ref(null);
const countId = nanoid();
let counter = reactive({});

const countStart = () => {
  // this.$nextTick(() => {
  counter = new CountUp(countId, props.startVal, props.endVal, props.decimals, props.duration, {
    useEasing: props.useEasing,
    useGroup: props.useGroup,
    separator: props.separator,
    decimal: props.decimal,
  });
  setTimeout(() => {
    counter.start();
  }, props.delay);
  // });
};

const handleScroll = () => {
  if (isStarted) { return; }
  if (!number.value.getBoundingClientRect) { return; }
  const numberEle = number.value.getBoundingClientRect();
  if (!numberEle) { return; }
  const windowTopOffset = numberEle.top;
  const threshold = document.body.clientHeight * 0.9; // 距離底部 10% （1-0.9）時出現

  if (threshold > windowTopOffset) {
    isStarted = true;
    countStart();
    document.querySelector('#app').removeEventListener('scroll', handleScroll);
  }
};

watch(() => props.endVal, (newVal) => {
  counter.update(newVal);
});

onMounted(() => {
  handleScroll();
  document.querySelector('#app').addEventListener('scroll', handleScroll);
});
</script>
