<template>
  <div class="v-re-select">
    <ReSelect v-model="value1" :options="phoneOptions" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReSelect from '@/components/ReSelect/index.vue';
import { phoneOptions } from '@/config/mockOptions.js';

export default defineComponent({
  name: 'ViewReSelect',
  components: {
    ReSelect,
  },
  setup() {
    const value1 = ref(1);

    return {
      phoneOptions,
      value1,
    };
  },
});
</script>

<style lang="scss" scoped></style>
