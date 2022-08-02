<template>
  <div class="v-re-time-picker">
    <ReTimePicker />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReTimePicker from '@/components/ReTimePicker/index.vue';

export default defineComponent({
  name: 'ViewReTimePicker',
  components: {
    ReTimePicker,
  },
  setup() {},
});
</script>

<style lang="scss" scoped></style>
