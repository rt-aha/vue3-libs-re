<template>
  <div class="v-re-time-picker">
    <ReTimePicker v-model="time" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReTimePicker from '@/components/ReTimePicker/index.vue';

export default defineComponent({
  name: 'ViewReTimePicker',
  components: {
    ReTimePicker,
  },
  setup() {
    const time = ref(new Date());

    return {
      time,
    };
  },
});
</script>

<style lang="scss" scoped></style>
