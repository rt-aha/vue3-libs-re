<template>
  <div class="v-re-date-range-picker">
    <dev-section title="基本使用">
      <ReDateRangePicker v-model="value" />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReDateRangePicker from '@/components/ReDateRangePicker.vue';

export default defineComponent({
  name: 'ViewReDateRangePicker',
  components: {
    ReDateRangePicker,
  },
  setup() {
    const value = ref({
      start: new Date(),
      end: new Date(),
    });

    return {
      value,
    };
  },
});
</script>

<style lang="scss" scoped></style>
