<template>
  <div class="v-re-checkbox">
    <ReCheckbox v-model="value1" :optionConfig="fruitDataOptions" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReCheckbox from '@/components/ReCheckbox.vue';
import { fruitDataOptions } from '@/config/mockOptions';

export default defineComponent({
  name: 'ViewReCheckbox',
  components: {
    ReCheckbox,
  },
  setup() {
    const value1 = ref(['apple']);
    return {
      value1,
      fruitDataOptions,
    };
  },
});
</script>
