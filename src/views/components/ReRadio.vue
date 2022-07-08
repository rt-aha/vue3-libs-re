<template>
  <div class="v-re-radio">
    ReRadio 施工中 ...
    <ReRadio v-model="value1" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReRadio from '@/components/ReRadio.vue'

export default defineComponent({
  name: 'ViewReRadio',
  components: {
    ReRadio
  },
  setup() {
    const value1 = ref(false)

    return {
      value1
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
