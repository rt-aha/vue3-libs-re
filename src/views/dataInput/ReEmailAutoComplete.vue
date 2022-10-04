<template>
  <div class="v-re-email-auto-complete">
    <dev-section title="基本使用">
      <ReEmailAutoComplete v-model="value" />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReEmailAutoComplete from '@/components/dataInput/ReEmailAutoComplete.vue';

export default defineComponent({
  name: 'ViewReEmailAutoComplete',
  components: {
    ReEmailAutoComplete,
  },
  setup() {
    const value = ref('123');

    return {
      value,
    };
  },
});
</script>

<style lang="scss" scoped></style>
