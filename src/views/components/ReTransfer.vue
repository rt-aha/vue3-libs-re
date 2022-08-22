<template>
  <div class="v-transfer">
    <re-transfer v-model="value1" :options="transferOptions" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReTransfer from '@/components/ReTransfer.vue';
import { transferOptions } from '@/config/mockOptions';

export default defineComponent({
  name: 'ViewTransfer',
  components: {
    ReTransfer,
  },
  setup() {
    const value1 = ref(['option1']);

    return {
      value1,
      transferOptions,
    };
  },
});
</script>

<style lang="scss" scoped></style>
