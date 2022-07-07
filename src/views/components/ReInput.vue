<template>
  <div class="v-re-input">
    
    <ReInput v-model="value1"/>
  </div>
</template>

<script>
import { defineComponent, ref  } from 'vue';
import ReInput from '@/components/ReInput/index.vue'

export default defineComponent({
  name: 'ViewReInput',
  components: {
    ReInput
  },
  setup() {
    const value1 = ref('');
    

    return {
value1
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
