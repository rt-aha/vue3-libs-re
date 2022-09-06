<template>
  <div class="v-re-email-auto-complete">
    <ReEmailAutoComplete v-model="value" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReEmailAutoComplete from '@/components/ReEmailAutoComplete.vue';

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
