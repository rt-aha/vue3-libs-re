<template>
  <div class="v-re-switch">
    <ReSwitch v-model="value1" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReSwitch from '@/components/ReSwitch.vue';

export default defineComponent({
  name: 'ViewReSwitch',
  components: {
    ReSwitch,
  },
  setup() {
    const value1 = ref(true);

    return {
      value1,
    };
  },
});
</script>

<style lang="scss" scoped></style>
