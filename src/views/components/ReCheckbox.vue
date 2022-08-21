<template>
  <div class="v-re-checkbox">
    <ReCheckbox v-model="value1" :optionConfig="phoneOptions" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReCheckbox from '@/components/ReCheckbox.vue';
import { phoneOptions } from '@/config/mockOptions';

export default defineComponent({
  name: 'ViewReCheckbox',
  components: {
    ReCheckbox,
  },
  setup() {
    const value1 = ref(['apple']);
    return {
      value1,
      phoneOptions,
    };
  },
});
</script>
