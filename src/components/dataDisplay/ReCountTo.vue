<template>
  <span :id="countId" ref="numberRef" />
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
  scrollContainer: {

  },
});

const numberRef = ref(null);
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
  if (!numberRef.value.getBoundingClientRect) { return; }
  const numberEle = numberRef.value.getBoundingClientRect();
  if (!numberEle) { return; }
  const windowTopOffset = numberEle.top;
  const threshold = document.body.clientHeight * 0.9; // 距離底部 10% （1-0.9）時出現

  if (threshold > windowTopOffset) {
    countStart();
    document.querySelector('.ly-base-layout__body__container').removeEventListener('scroll', handleScroll);
  }
};

watch(() => props.endVal, (newVal) => {
  counter.update(newVal);
});

onMounted(() => {
  handleScroll();
  document.querySelector('.ly-base-layout__body__container').addEventListener('scroll', handleScroll);
});
</script>
