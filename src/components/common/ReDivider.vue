<template>
  <div
    class="re-divider"
    :class="{
      're-divider--verticle': verticle,
    }"
    :style="{
      'margin-top': m.top,
      'margin-bottom': m.bottom,
      'margin-left': m.left,
      'margin-right': m.right,
      'border-top': setting.bt,
      'border-left': setting.bl,
      'width': setting.w,
      'height': setting.h,
      'border-color': c,
      'border-style': bs,
    }"
  />
</template>

<script setup>
const props = defineProps({
  margin: {
    type: Object,
    default: () => ({
      top: '10px',
      bottom: '10px',
      left: '10px',
      right: '10px',
    }),
  },
  verticle: {
    type: Boolean,
    default: false,
  },
  length: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  bold: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
});

const m = computed(() => {
  const { top, bottom, left, right } = props.margin;

  if (props.verticle) {
    return {
      top: 0,
      bottom: 0,
      left,
      right,
    };
  }

  return {
    top,
    bottom,
    left: 0,
    right: 0,
  };
});

const wh = computed(() => {
  if (props.verticle) {
    return {
      w: props.bold || '1px',
      h: props.length || '14px',
    };
  }

  return {
    w: props.length || '100%',
    h: props.bold || '1px',
  };
});

const c = computed(() => {
  return props.color || '#eee';
});

const bs = computed(() => {
  return props.type || 'solid';
});

const setting = computed(() => {
  if (props.verticle) {
    return {
      bt: 0,
      bl: wh.value.w,
      w: 0,
      h: wh.value.h,
    };
  }

  return {
    bt: wh.value.h,
    bl: 0,
    w: wh.value.w,
    h: 0,
  };
});
</script>

<style lang="scss" scoped></style>
