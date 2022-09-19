<template>
  <div class="v-date-picker">
    <dev-section title="基本使用">
      <ReDatePicker v-model="value" />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReDatePicker from '@/components/ReDatePicker.vue';

export default defineComponent({
  name: 'ViewReDatePicker',
  components: {
    ReDatePicker,
  },
  setup() {
    const value = ref(new Date());

    return {
      value,
    };
  },
});
</script>

<style lang="scss" scoped></style>
