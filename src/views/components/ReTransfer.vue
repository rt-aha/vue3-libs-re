<template>
  <div class="v-transfer">
    <re-transfer :options="transferOptions" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReTransfer from '@/components/ReTransfer.vue';
import { transferOptions } from '@/config/mockOptions';

export default defineComponent({
  name: 'ViewTransfer',
  components: {
    ReTransfer,
  },
  setup() {
    return {
      transferOptions,
    };
  },
});
</script>

<style lang="scss" scoped></style>
