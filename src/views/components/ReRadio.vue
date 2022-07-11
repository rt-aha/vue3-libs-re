<template>
  <div class="v-re-radio">
    ReRadio 施工中 ...
    <ReRadio v-model="value1" :optionConfig="fruitDataOptions" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReRadio from '@/components/ReRadio.vue';
import { fruitDataOptions } from '@/config/mockOptions';

export default defineComponent({
  name: 'ViewReRadio',
  components: {
    ReRadio,
  },
  setup() {
    const value1 = ref('apple');

    return {
      value1,
      fruitDataOptions,
    };
  },
});
</script>

<style lang="scss" scoped></style>
