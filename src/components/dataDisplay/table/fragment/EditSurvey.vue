<template>
  <div class="c-edit-survey">
    <ReImage :src="editIcon" alt="logo" width="20px" cursor @click="toSomeWhere" />
  </div>
</template>

<script setup>
import ReImage from '@/components/dataDisplay/ReImage.vue';
import editIcon from '@/assets/icon/edit.svg';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  column: {
    type: Object,
    default: () => ({}),
  },
  idx: {
    type: Number,
    default: () => ({}),
  },
});

const toSomeWhere = () => {
  console.log('data', props.data);
  console.log('column', props.column);
  console.log('idx', props.idx);
};
</script>

<style lang="scss" scoped>
.c-edit-survey {
  display: inline-block;
}
</style>
